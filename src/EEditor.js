import React, { useContext } from 'react';
import styled from 'styled-components';
import ME from 'react-monaco-editor';

import shadow from './shadow';
import { eeeContext } from './context/eeeContext';

const Main = styled.div`
    grid-area: ${props => props.grid};
    background-color: ${props => props.theme.dp6};
    color: ${props => props.theme.fontcol};
    box-shadow: ${ shadow(6) };
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

const Editor = styled.textarea`
    width: 100%;
    height: 100%;
    padding: 0.5em;
    resize: none;
    border: 0;
    background-color: #00000055;
    color: ${props => props.theme.fontcol};
`;

export default function EEditor(props) {
    const { changeNotEe, notee, ee } = useContext(eeeContext);

    let change, val;
    if(props.type === "notee") {
        change = changeNotEe;
        val = notee;
    } else {
        change = "";
        val = ee;
    }

    return(
        <Main grid={ props.type }>
            <Header>
                { props.title }
            </Header>
            <Wrapper>
                <ME 
                    theme="vs-dark"
                    options={{ 
                        minimap: {enabled: true},
                        language: "cpp",
                        lineNumbersMinChars: 4,
                        lineDecorationsWidth: 0,
                        scrollbar: { verticalScrollbarSize: 0 }
                    }}
                    value={ val }
                    onChange={ value => change(value) }
                />
            </Wrapper>
        </Main>
    );
}