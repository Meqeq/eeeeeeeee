import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import ME from 'react-monaco-editor';

import shadow from './shadow';
import { eeeContext } from './context/eeeContext';

const Main = styled.div`
    grid-area: ${props => props.grid};
    background-color: ${props => props.theme.dp6};
    color: ${props => props.theme.fontcol};
    box-shadow: ${ shadow(4) };
`;

const Header = styled.header`
    height: 2em;
    line-height: 2em;
    text-align: center;
    border-bottom: 0.2em solid ${props => props.theme.prim};
`;

const Wrapper = styled.div`
    height: calc(100% - 2em);
    padding: 1em;
    width: 100%;
`;

export default props => {
    const { changeNotEe, notee, ee } = useContext(eeeContext);
    const { theme } = useContext(ThemeContext);
    
    let change, val;
    if(props.type === "notee") {
        change = changeNotEe;
        val = notee;
    } else {
        change = () => console.log("not implemented");
        val = ee;
    }

    return(
        <Main grid={ props.type }>
            <Header>
                { props.title }
            </Header>
            <Wrapper>
                <ME 
                    theme={ theme === "light" ? "vs" : "vs-dark" }
                    options={{ 
                        minimap: {enabled: true},
                        language: "cpp",
                        lineNumbersMinChars: 4,
                        lineDecorationsWidth: 0,
                    }}
                    value={ val }
                    onChange={ value => change(value) }
                />
            </Wrapper>
        </Main>
    );
}