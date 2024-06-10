import styled from 'styled-components'


export const StyledChatContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: fit-content;
    padding: 6px 12px;
    gap: 6px;
    border-bottom: 1px solid rgb(235, 238, 240);
    
    
    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.colors.light};
    }
`