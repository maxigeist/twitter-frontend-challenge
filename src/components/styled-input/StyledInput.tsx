import styled from "styled-components";
import "@fontsource/manrope";
import {InputContainerProps} from "./InputContainer";


export const StyledInput = styled.input<InputContainerProps>`
    font-size: 16px;
    outline: none;
    border: none;
    background: none;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: ${(props) => {
        switch (props.sizing) {
            case 'SMALL':
                return '180px'
            case 'MEDIUM':
                return '260px'
            case 'LARGE':
                return '317px'
        }
    }};
`
