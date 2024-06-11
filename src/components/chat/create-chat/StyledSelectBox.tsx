import styled from "styled-components";
import {Theme} from "../../../util/LightTheme";

export const StyledSelectBox = styled.select`
    border: 1px solid ${(props) => props.theme.colors.light};
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    gap: 4px;
    padding: 4px;
    
    &:focus{
        outline: none;
        border: 1px solid ${(props) => props.theme.colors.light};
    }
    
    &:active{
        border: 1px solid ${(props) => props.theme.colors.light};
    }
    
`

type OptionProps = {
    selected:boolean
    theme:Theme
}

export const StyledOption = styled.option<OptionProps> `
    display: flex;
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 2px;
    
    background: ${(props: OptionProps) => {
        switch (props.selected) {
            case true:
                return props.theme.colors.light;
        }
    }};;
    
    &:checked {
        box-shadow: 0 0 10px 100px ${(props) => props.theme.colors.light} inset;
        background: none;
        color:inherit;
    }
    
`

export const StyledCreateChatModal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    width: 300px;
    
    `