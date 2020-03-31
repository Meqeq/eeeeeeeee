import React, { createContext, useReducer } from 'react';
import reducer, { CHANGE_NOT_EEE, CHANGE_EE } from './reducer';

const initialEee = {
    notee: ``,
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
        return string.replace(/([.^$*+?(\\)[\]{}|])/g, "\\$1");
    }

    // transform c/c++ code to #define eeeee 
    const compileEe = () => {
        let eee = "";

        let input = state.notee + " ";

        if(input === "") return;

        if(input.indexOf("\r\n") > -1) input = input.replace(/\r\n/g, "\n");
        
        let defines = input.match(/#.*\n/g);

        if( defines ) {
            defines.forEach( value => { // leave already made #defines, #includes, etc.
                eee += value;
                input = input.replace(value, "");
            });
        }

        let strings = input.match(/("|(L"))([^"\\]|\\"|\\[^"])*"/g); // look for string to handle them separately
        if( strings) {
            strings.forEach( (value, key) => {
                input = input.replace(value, "string_kek_lel_tghffthfjfjyjyjdjdtyjdyjyj_" + key); 
            });
        }

        input = input.replace(/\/\/.*/g, "").replace(/\/\*(\*(?!\/)|[^*])*\*\//g, ""); // erase all comments

        input = "\n " + input.replace(/\n/g, " \n ").replace(/\t/g, "");

        let addSpaceAround = [ 
            "\\+", "\\-", "\\*", "/", "%",
            "\\=", "<", ">", "!",
            "~", "&", "\\^", "\\|",
            "\\?", "\\:", ",", ";", "\\.",
            "\\(", "\\)", "\\[", "\\]", "\\{", "\\}",
            "\\:\\:", "<<", ">>", "\\|\\|", "&&", "\\+\\+", "\\-\\-"
        ];

        let replaces = [];
        
        let check = c => {
            let code = c.charCodeAt(0);

            if( 
                (code > 63 && code < 91) ||
                (code > 96 && code < 123) ||
                (code > 47 && code < 58) ||
                code === 32 || code === 95
            ) return true;
            return false;
        }

        addSpaceAround.forEach( value => {
            if( input.match(value) ) {
                let reg = new RegExp("(.)(" + value + ")(.)", "g");

                input = input.replace(reg, (match, p1, p2, p3) => {
                    let res = p2;
                    switch(p2) {
                        case "(": case ")": case "[": case "]": case "{": case "}": case ",":
                            return `${p1} ${p2} ${p3}`;   

                        case ".":
                            if((!isNaN(p1) && !isNaN(p3)) || p1 === "'" || p2 === "'")
                                return `${p1}${p2}${p3}`
                            else
                                return `${p1} ${p2} ${p3}`; 
                        default:
                            if(check(p1))
                                res = p1 + " " + res;
                            else
                                res = p1 + res;

                            if(check(p3))
                                res += " " + p3;
                            else
                                res += p3;
                    }
                    
                    return res;
                });
                replaces.push({ v: value, a: 0 });
            }
        });

        input = input.replace(/ +/g, " ");// squeeze multiple spacaes

        let alreadyDeclaredE = input.match(/ e+ /g);

        if(alreadyDeclaredE) {
            alreadyDeclaredE.forEach( (value, key) => {
                input = input.replace(new RegExp(value, "g"), " amvar_kek_lel_" + key + " ");
            });
        }

        replaces = replaces.filter( value => value.a !== 0 );
        let toE = input.split(" "); // split code to array
        

        toE.forEach( value => {
            let rep = addBackslash(value);
            let key = replaces.findIndex( replace => replace.v === rep);

            if(!value.includes("string_kek_lel_tghffthfjfjyjyjdjdtyjdyjyj_") && value !== "\n") {
                if( key === -1 ) {
                    replaces.push({ v: rep, a: 1 - value.length });
                } else {
                    replaces[key].a++;
                }
            }
            
        });

        replaces = replaces.filter( value =>  value.v !== "" );

        replaces.sort( (a, b) => { // sort them based on amount and length
            if( a.a > b.a) return -1;
            if( a.a === b.a) return 0;
            return 1; 
        });

        replaces.forEach( ({v}, key) => { // transform code to eeeee
            let newEee = makeEe(key)

            eee += `#define ${newEee} ${v.replace(/\\/g, "")}\n`;
            let reg = new RegExp(" " + v + " ", "g");
            
            input = input.replace(reg, " " + newEee + " ");

        });

        if( strings) {
            strings.forEach( (value, key) => { // handle strings
                let newEee = "s" + makeEe(key);
    
                eee += `#define ${newEee} ${value}\n`;
    
                input = input.replace("string_kek_lel_tghffthfjfjyjyjdjdtyjdyjyj_" + key,newEee);
            });
        }

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