import styled from 'styled-components'
import {Theme} from "../../util/LightTheme";

export enum MessageType{
    USER='USER',
    OTHER= 'OTHER'
}
interface MessageContainerProps {
    type: MessageType
    theme: Theme
}

export const MessageWrapper = styled.div`
    display: flex;
    justify-content: ${(props: MessageContainerProps) => {
    switch (props.type) {
        case MessageType.USER:
            return 'flex-end';
        case MessageType.OTHER:
            return 'flex-start';
    }
}};
`;

export const StyledMessageP = styled.p`
    margin: 0;
    
    
    font-size: 14px;
`
export const StyledMessageSender = styled.p `
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    `



export const StyledMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 8px;
    width: fit-content;
    margin: 4px 0;
    color: ${(props) => props.theme.colors.white};
    
    background-color: ${(props: MessageContainerProps) => {
        switch (props.type) {
            case MessageType.USER:
                return props.theme.colors.main;
            case MessageType.OTHER:
                return props.theme.colors.lightText;
        }
    }};
`;
export default StyledMessageContainer
