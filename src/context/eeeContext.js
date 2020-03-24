import React, { createContext, useReducer } from 'react';
import reducer, { CHANGE_NOT_EEE, CHANGE_EE } from './reducer';

const initialEee = {
    notee: "",
    ee: ""
}

export const eeeContext = createContext(initialEee);

export const EeeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialEee);

    // controls user input
    const changeNotEe = value => {
        dispatch({
            type: CHANGE_NOT_EEE,
            payload: value
        });
    }

    // returns string containing given amount of 'e'
    const makeEe = length => {
        let output = "";
        for(let i = 0; i < length + 1; i++) output += "e";
        return output;
    }

    // escape special characters to find them and replace in code
    const addBackslash = string => {
        let replaces = [ "\\", "(", ")", "[", "]", "*", ".", "+", "|" ];
        replaces.forEach( value => string = string.replace(value, "\\" + value));

        string = string.replace("\\||", "\\|\\|");
        return string;
    }

    // transform c/c++ code to #define eeeee 
    const compileEe = () => {
        let eee = "";

        let input = state.notee;
        let defines = input.match(/#.*\n/g);
        
        defines.forEach( value => { // leave already made #defines, #includes, etc.
            eee += value;
            input = input.replace(value, "");
        });

        // initial characters to replace
        let replaces = [ ";", "*", "+", ":", ",", "!", "(", ")", "[", "]", "::", "&", "{", "}", ".", "/"  ];

        replaces.forEach( value => { // add space wherever it is possible
            let reg = new RegExp("([\\w\\d \n\\(\\)\\[\\]\\{\\}\"])\\" + value + "([\\w\\d \n\\)\\(\\[\\]\\{\\}])", "g");
            input = input.replace(reg, "$1 " + value + " $2");
        });

        input = input.replace(/\+\+/g, " ++ ").replace(/\|\|/g, " || "); 

        input = input.replace(/ +/g, " ").replace(/\n/g, " \n ").replace(/\t/g, " \t "); // squeeze multiple spacaes

        let strings = input.match(/("|(L"))[|\w\d-:.<>, ]*"/g); // look for string to handle them separately

        strings.forEach( (value, key) => {
            input = input.replace(value, "string_kek_lel_tghffthfjfjyjyjdjdtyjdyjyj_" + key); 
        });

        let toE = input.split(" "); // split code to array

        toE.forEach( value => {
            let key = replaces.findIndex( replace => replace === value);

            if( key === -1 && !value.includes("string_kek_lel_tghffthfjfjyjyjdjdtyjdyjyj_")) { // add unique strings
                replaces.push(value);
            }
        });

        replaces = replaces.filter( value => value !== "" && value !== "\n" && value !== '"' && value !== "\t");

        replaces.sort( (a, b) => { // sort them by length
            if( a.length < b.length) return -1;
            if( a.length === b.length) return 0;
            return 1; 
        });

        replaces.forEach( (value, key) => { // transform code to eeeee
            let newEee = makeEe(key)

            eee += `#define ${newEee} ${value}\n`;
            let reg = new RegExp(" " + addBackslash(value) + " ", "g");
            input = input.replace(reg, " " + newEee + " ");
        });

        strings.forEach( (value, key) => { // handle strings
            let newEee = "s" + makeEe(key);

            eee += `#define ${newEee} ${value}\n`;

            input = input.replace("string_kek_lel_tghffthfjfjyjyjdjdtyjdyjyj_" + key,newEee);
        });

        dispatch({
            type: CHANGE_EE,
            payload: eee + input
        })
    }

    return(
        <eeeContext.Provider value={{
            notee: state.notee,
            ee: state.ee,
            changeNotEe,
            compileEe
        }}>
            { children }
        </eeeContext.Provider>
    );

}