import styled from "styled-components";
import "@fontsource/manrope";

export enum ButtonSize {
    SMALL= 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE'
}

export enum ButtonVariant{
    OUTLINED = 'OUTLINED',
    FULFILLED = 'FULFILLED',
    GHOST = 'GHOST',
    DISABLED = 'DISABLED',
    WHITE = 'WHITE'
}

interface ButtonProps{
    size: ButtonSize
    buttonVariant: ButtonVariant
}


export const StyledButton = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    gap: 8px;
    width: ${(props) => {
        switch (props.size){
            case 'SMALL':
                return '75px'
            case 'MEDIUM':
                return '125px'
            case 'LARGE':
                return '175px'
    }}};
    margin-bottom: 8px;
    height: 33px;
    left: 16px;
    top: 16px;
    background: ${(props) => {
        switch (props.buttonVariant) {
            case 'OUTLINED':
                return props.theme.colors.white;
            case 'FULFILLED':
                return props.theme.colors.main;
            case 'GHOST':
                return props.theme.colors.transparent
            case "DISABLED":
                return props.theme.colors.light;
            case 'WHITE':
                return props.theme.colors.white
            default:
                return props.theme.colors.main;
        }
    }};
    font-family: ${(props) => props.theme.font.default};
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 110%;
    border-radius: 40px;
    
    border: ${(props) => {
        switch (props.buttonVariant) {
            case 'OUTLINED':
                return `1px solid ${props.theme.colors.main}`
            case 'FULFILLED':
                return `1px solid ${props.theme.colors.white}`
            case 'GHOST':
                return `1px solid ${props.theme.colors.main}`
            default:
                return 'none'
        }
    }};

    color: ${(props) => {
        switch (props.buttonVariant) {
            case 'OUTLINED':
                return props.theme.colors.main
            case 'FULFILLED':
                return props.theme.colors.white
            case 'GHOST':
                return props.theme.colors.main
            default:
                return props.theme.colors.white
        }
    }};


    text-align: center;

    cursor: pointer;

    transition: 0.3s;

    &:active {
        transform: scale(0.95);
    }

    &:hover {
        background: ${(props) => {
            switch (props.buttonVariant) {
                case 'OUTLINED':
                    return props.theme.hover.outlined;
                case 'GHOST':
                    return props.theme.hover.default;
                case 'DISABLED':
                    return props.theme.hover.disabled;
            }
        }};
        color: ${(props) => {
            switch (props.buttonVariant) {
                case 'OUTLINED':
                    return props.theme.colors.main
                case 'FULFILLED':
                    return props.theme.colors.white
                case 'GHOST':
                    return props.theme.colors.white
                default:
                    return props.theme.colors.white
            }
        }};
        

`;
export default StyledButton