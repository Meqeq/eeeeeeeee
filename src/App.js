import React from 'react';
import styled from 'styled-components';

import { EeeProvider } from './context/eeeContext';
import Theme from './context/themeContext';
import EEditor from './EEditor';
import Buttons from './Buttons';
import shadow from './shadow';

const Main = styled.main`
    height: calc(100vh - 8em);
    padding: 1em;
    display: grid;
    grid-template-columns: 4em 1fr 8em 1fr 4em;
    grid-template-rows: 1fr 11em 1fr;
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
    text-align: center;
    line-height: 4em;
`;  

export default () => {
    return (
        <Theme>
            <EeeProvider>
                <Header>eeeeeeeeeeeeeeeeeeeeeeeeeee</Header>
                <Main>
                    <EEditor type="notee" title="Eeeeeeenteeeer your codeeee heeereee"></EEditor>
                    <Buttons />
                    <EEditor type="ee" title="eee eeee eeee eeee"></EEditor>
                </Main>
                <Footer>
                    eeeeeeeee | eeee 2020 eeeee
                </Footer>
            </EeeProvider>
        </Theme>
    );
}
