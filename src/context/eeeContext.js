import React, { createContext, useReducer } from 'react';
import reducer, { CHANGE_NOT_EEE, CHANGE_EE } from './reducer';

const initialEee = {
    notee: `#define _CRT_SECURE_NO_WARNINGS
    #include <iostream>
    #include <windows.h>
    #include <Psapi.h>
    #include <vector>
    
    DWORD WINAPI pi( LPVOID p ) {
        int n = *(int*)p;
    
        double res = 0;
        double sign = 1;
        double div = 1;
        for (int i = 0; i < n; i ++) {
            res += sign / div;
            sign *= -1;
            div += 2;
        }
        res *= 4;
        return 0;
    }
    
    int getExecutionTime( HANDLE handle ) {
        FILETIME creation, exit, kernel, user;
        if (GetThreadTimes( handle, &creation, &exit, &kernel, &user )) {
            ULARGE_INTEGER ul;
            ul.LowPart = creation.dwLowDateTime;
            ul.HighPart = creation.dwHighDateTime;
            __int64 creationTime = ul.QuadPart;
    
            ul.LowPart = exit.dwLowDateTime;
            ul.HighPart = exit.dwHighDateTime;
            __int64 exitTime = ul.QuadPart;
    
            __int64 diff = exitTime - creationTime;
    
            return (int)diff / 10000;
        } 
        else return 0;
    }
    
    void getName( int prior, char* str ) {
        switch( prior ) {
            case 0: strcpy( str, "normalny" ); break;
            case 1: strcpy( str, "powyzej" ); break;
            case -1: strcpy( str, "ponizej" ); break;
            case 2: strcpy( str, "wysoki" ); break;
            case -2: strcpy( str, "niski" ); break;
        }
    }
    
    int wmain( int argc, wchar_t* argv[] )
    {
        int n = 150000000;
    
        int prior[10][10] = { 
            {},
            { 1 },
            { 1, -1 },
            { 2, 1, -1},
            { 2, 1, -1, -2 },
            { 2, 1, -1, -2 },
            { 2, 1, -1, -2 },
            { 2, 1, -1, -2 },
            { 2, 1, -1, -2 },
            { 2, 1, -1, -2 }
        };
    
    
        char name[15] = "";
        for (int i = 0; i < 10; i++) {
            std::vector<HANDLE> handles;
            std::cout << "Liczba watkow: " << i + 1 << std::endl;
            for (int j = 0; j <= i; j++) {
                handles.push_back(CreateThread( NULL, 0, pi, &n, 0, NULL ));
                
                if (!handles.back()) {
                    std::cerr << "Wystapil blad podczas tworzenia procesu";
                    break;
                }
    
                if (!SetThreadPriority( handles.back(), prior[i][j] )) {
                    std::cerr << "Wystapil blad podczas nadawania priorytetu";
                    break;
                }
            }
    
            WaitForMultipleObjects( handles.size(), handles.data(), TRUE, INFINITE );
    
            for (size_t j = 0; j < handles.size(); j++) {
                getName( prior[i][j], name );
                
                std::cout << " " << j + 1 << ": " << name << " " << getExecutionTime( handles[j] ) << " ms" << std::endl;
    
                CloseHandle( handles[j] );
            }
            std::cout << "-----------------------------" << std::endl;
        }
    
        
    
        return 0;
    }`,
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
                            if(!isNaN(p1) && !isNaN(p3))
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