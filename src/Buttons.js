import React, { useContext } from 'react';
import styled from 'styled-components';
import shadow from './shadow';

import { eeeContext } from './context/eeeContext';

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
    color: ${props => props.theme.fontcol};

    &:hover {
        background-color: ${props => props.theme.lsec};
        cursor: pointer;
    }
`;

export default props => {
    const { compileEe } = useContext(eeeContext);

    return(
        <Buttons>
            <Button onClick={ e => compileEe() }>eeee =&gt;</Button>
            <Button>&lt;= unee</Button>
        </Buttons>
    );
}