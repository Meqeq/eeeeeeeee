import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import { EeeProvider } from './context/eeeContext';
import EEditor from './EEditor';
import Buttons from './Buttons';
import shadow from './shadow';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: calc(14px + 8 * ((100vw - 320px) / 1600));
    }

    body {
        font-family: 'Roboto', sans-serif;
        background-color: ${props => props.theme.background};
    }
`;

const theme = {
    background: "#121212",
    dp4: "#272727",
    dp6: "#2C2C2C",
    dp8: "#2F2F2F",
    // PRIMARY COLOR,
    prim: "#81d4fa",
    lprim: "#b6ffff",
    dprim: "#4ba3c7",
    // SECONDARY COLOR,
    sec: "#e57373",
    lsec: "#ffa4a2",
    dsec: "#af4448",
    // PRIMARY FONT COLOR,
    fontcol: "#fff",
    // SECONDARY FONT COLOR,
    secFontcol: "#000"
}

const Main = styled.main`
    height: calc(100vh - 8em);
    padding: 1em;
    display: grid;
    grid-template-columns: 4em 1fr 8em 1fr 4em;
    grid-template-rows: 1fr 5em 1fr;
    grid-template-areas: 
        ". notee . ee ."
        ". notee buttons ee ."
        ". notee . ee .";
`;

const Header = styled.header`
    height: 2.5em;
    background-color:  ${props => props.theme.dp4};
    color: ${props => props.theme.fontcol};
    box-shadow: ${ shadow(4) };
    text-align: center;
    font-size: 1.6em;
    line-height: 2.5em;
`;

const Footer = styled.footer`
    height: 4em;
    background-color:  ${props => props.theme.dp4};
    color: ${props => props.theme.fontcol};
    box-shadow: ${ shadow(4) };
`;  

function App() {
    return (
        <ThemeProvider theme={ theme }>
            <EeeProvider>
                <GlobalStyle />
                <Header>eeeeeeeeeeeeeeeeeeeeeeeeeee</Header>
                <Main>
                    <EEditor type="notee" title="Eeeeeeenteeeer your codeeee heeereee"></EEditor>
                    <Buttons>
                        
                    </Buttons>
                    <EEditor type="ee" title="eee eeee eeee eeee"></EEditor>
                </Main>
                <Footer></Footer>
            </EeeProvider>
        </ThemeProvider>
    );
}

export default App;
