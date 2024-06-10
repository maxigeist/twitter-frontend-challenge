import React, {useState, useEffect} from 'react';
import {socket} from "../../socket/socket";
import {ChatViewDTO} from "../../service";
import {StyledScrollableContainer} from "../../components/common/Container";
import {StyledH3, StyledH5} from "../../components/common/text";
import ChatPreview from "../../components/chat/ChatPreview";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {StyledChatPageContainer} from "../../components/chat/ChatPageContainer";
import {StyledHeaderContainer} from "../home-page/components/header/HeaderContainer";

const ChatPage = () => {
    const chats = useAppSelector((state) => state.socket.chats)


    return (
        <>
            <StyledChatPageContainer>
                <StyledHeaderContainer>
                    <StyledH3>Chats</StyledH3>
                    <button></button>
                </StyledHeaderContainer>
                <StyledScrollableContainer>
                    {chats?.map((chat) =>
                        <ChatPreview name={chat.name}
                                     id={chat.id}
                                     lastMessage={chat.lastMessage}
                                     picture={chat.picture}
                        />
                    )}
                </StyledScrollableContainer>
            </StyledChatPageContainer>
        </>
    );
}

export default ChatPage