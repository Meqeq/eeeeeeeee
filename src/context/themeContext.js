import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleRight, faAngleDoubleLeft, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDoubleRight, faAngleDoubleLeft, faSun, faMoon);

const GlobalStyle = createGlobalStyle`
    html {
        font-size: calc(14px + 8 * ((100vw - 320px) / 1600));
    }

    body {
        font-family: 'Roboto', sans-serif;
        background-color: ${props => props.theme.background};
    }
`;

const darkTheme = {
    background: "#121212",
    dp4: "#272727",
    dp6: "#2C2C2C",
    dp8: "#2F2F2F",
    // PRIMARY COLOR,
    prim: "#81d4fa",
    lprim: "#b6ffff",
    dprim: "#4ba3c7",
    // SECONDARY COLOR,
    sec: "#a5d6a7",
    lsec: "#d7ffd9",
    dsec: "#75a478",
    // PRIMARY FONT COLOR,
    fontcol: "#fff",
    // SECONDARY FONT COLOR,
    secFontcol: "#000"
}

const lightTheme = {
    background: "#e2e2e2",
    dp4: "#03a9f4",
    dp6: "#ffffff",
    dp8: "#ffffff",
    // PRIMARY COLOR,
    prim: "#03a9f4",
    lprim: "#67daff",
    dprim: "#007ac1",
    // SECONDARY COLOR,
    sec: "#4caf50",
    lsec: "#80e27e",
    dsec: "#087f23",
    // PRIMARY FONT COLOR,
    fontcol: "#000",
    // SECONDARY FONT COLOR,
    secFontcol: "#000"
}

export default ({ children }) => {
    const [theme, setTheme] = useState("light");

    let selectedTheme = theme === "light" ? lightTheme : darkTheme;

    selectedTheme.setTheme = () => { theme === "light" ? setTheme("dark") : setTheme("light")};
    selectedTheme.theme = theme;

    return (
        <ThemeProvider theme={selectedTheme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
}