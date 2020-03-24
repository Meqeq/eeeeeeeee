import React, { useContext } from 'react';
import styled from 'styled-components';
import shadow from './shadow';

import { eeeContext } from './context/eeeContext';
import { ThemeContext } from 'styled-components';

import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome'

const Buttons = styled.div`
    grid-area: buttons;
    padding: 0 1em;
`;

const Button = styled.div`
    width: 6em;
    height: 2em;
    line-height: 2em;
    background-color: ${props => props.theme.sec};
    box-shadow: ${ shadow(6) };
    margin-bottom: 1em;
    text-align: center;
    color: ${props => props.theme.secFontcol};

    &:hover {
        background-color: ${props => props.theme.lsec};
        cursor: pointer;
    }

    svg {
        margin: 0 0.5em;
    }
`;

const ThemeSwitch = styled.div`
    width: 6em;
    height: 5em;
    background-color: ${props => props.theme.sec};
    color: ${props => props.theme.secFontcol};
    line-height: 6em;
    text-align: center;
    box-shadow: ${ shadow(6) };
    cursor: pointer;

    svg {
        width: 2em !important;
        height: 2em;
        margin: 0 0.3em;
    }
`;

export default props => {
    const { compileEe } = useContext(eeeContext);
    const { theme, setTheme } = useContext(ThemeContext);
    return(
        <Buttons>
            <Button onClick={ e => compileEe() }>
                <span>eeee</span>
                <Fa icon="angle-double-right" />
            </Button>
            <Button>
                <Fa icon="angle-double-left" />
                <span>unee</span>
            </Button>

            <ThemeSwitch onClick={ () => setTheme() }>
                <Fa icon="sun" style={{ opacity: theme === "light" ? 1 : 0.6 }}/>
                <Fa icon="moon" style={{ opacity: theme === "dark" ? 1 : 0.6 }}/>
            </ThemeSwitch>
        </Buttons>
    );
}