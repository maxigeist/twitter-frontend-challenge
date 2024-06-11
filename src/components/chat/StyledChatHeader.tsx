import styled from "styled-components";


export const StyledChatHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid ${(props) => props.theme.colors.containerLine};
    width: 100%;
    padding: 12px;
    `