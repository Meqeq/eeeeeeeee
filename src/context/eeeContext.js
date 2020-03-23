import React, { createContext, useReducer } from 'react';
import reducer, { CHANGE_NOT_EEE, CHANGE_EE } from './reducer';

const longer = `#define _CRT_SECURE_NO_WARNINGS
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
}`;

const shorter = `#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <windows.h>
#include <Psapi.h>
#include <vector>

int main( int argc, char* argv[] ) {
    int a = 10;
    char kek[10] = "eeee";
    std::cout << "Zdzislaw Onderka nie ma plecow" << a << kek << std::endl;
    return 0;
}
`;

const initialEee = {
    notee: longer,
    ee: ""
}

export const eeeContext = createContext(initialEee);

export const EeeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialEee);

    const changeNotEe = value => {
        dispatch({
            type: CHANGE_NOT_EEE,
            payload: value
        });
    }

    const makeEe = length => {
        let output = "";
        for(let i = 0; i < length + 1; i++) output += "e";
        return output;
    }

    const addBackslash = string => {
        let replaces = [ "\\", "(", ")", "[", "]", "*", ".", "+", "|" ];
        replaces.forEach( value => string = string.replace(value, "\\" + value));
        //console.log(string);

        string = string.replace("\\||", "\\|\\|");
        return string;
    }

    const compileEe = () => {
        let eee = "";

        let input = state.notee
        let defines = input.match(/#.*\n/g);
        
        defines.forEach( value => {
            eee += value;
            input = input.replace(value, "");
        });

        let replaces = [ ";", "*", "+", ":", ",", "!", "(", ")", "[", "]", "::", "&", "{", "}", ".", "/"  ];

        replaces.forEach( value => {
            let reg = new RegExp("([\\w\\d \n\\(\\)\\[\\]\\{\\}\"])\\" + value + "([\\w\\d \n\\)\\(\\[\\]\\{\\}])", "g");
            input = input.replace(reg, "$1 " + value + " $2");
        });

        input = input.replace(/\+\+/g, " ++ ").replace(/\|\|/g, " || ");

        input = input.replace(/ +/g, " ").replace(/\n/g, " \n ").replace(/\t/g, " \t ");

        let strings = input.match(/("|(L"))[|\w\d-:.<>, ]*"/g);

        strings.forEach( (value, key) => {
            console.log(value);
            input = input.replace(value, "string_kek_lel_tghffthfjfjyjyjdjdtyjdyjyj_" + key);
        });

        let toE = input.split(" ");

        toE.forEach( value => {
            let key = replaces.findIndex( replace => replace === value);

            if( key === -1 && !value.includes("string_kek_lel_tghffthfjfjyjyjdjdtyjdyjyj_")) {
                //console.log("dd", value);
                replaces.push(value);
            }
        });

        replaces = replaces.filter( value => value !== "" && value !== "\n" && value !== '"' && value !== "\t");
       // console.log(toE);
        //console.log(replaces);

        replaces.sort( (a, b) => {
            if( a.length < b.length) return -1;
            if( a.length === b.length) return 0;
            return 1; 
        });

        replaces.forEach( (value, key) => {
            let newEee = makeEe(key)
            ///console.log(value);
            eee += `#define ${newEee} ${value}\n`;
            let reg = new RegExp(" " + addBackslash(value) + " ", "g");
            input = input.replace(reg, " " + newEee + " ");
        });

        strings.forEach( (value, key) => {
            let newEee = "s" + makeEe(key)
            //console.log(value);
            eee += `#define ${newEee} ${value}\n`;

            input = input.replace("string_kek_lel_tghffthfjfjyjyjdjdtyjdyjyj_" + key,newEee);
        });
/*
        

        
        

        


        console.log(replaces);
        

        

       
        //console.log({ input, eee, replaces });
*/
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