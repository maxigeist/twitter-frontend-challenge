import React, {useEffect, useState} from 'react';
import {StyledScrollableContainer} from "../../components/common/Container";
import {StyledH3} from "../../components/common/text";
import ChatPreview from "../../components/chat/ChatPreview";
import {useAppSelector} from "../../redux/hooks";
import {StyledChatPageContainer} from "../../components/chat/ChatPageContainer";
import CreateChatModal from "../../components/chat/create-chat/CreateChatModal";
import StyledButton, {ButtonSize, ButtonVariant} from "../../components/styled-button/StyledButton";
import { StyledChatHeader } from '../../components/chat/StyledChatHeader';

const ChatPage = () => {
    const chats = useAppSelector((state) => state.socket.chats)
    const [openChatModal, setOpenChatModal] = useState(false)

    const handleCloseModal = () => {
        setOpenChatModal(false)
    }

    return (
        <>
            {openChatModal && <CreateChatModal onClose={() => handleCloseModal()}/>}
            <StyledChatPageContainer>
                <StyledChatHeader>
                    <StyledH3>Chats</StyledH3>
                    <StyledButton size={ButtonSize.LARGE} buttonVariant={ButtonVariant.FULFILLED}
                                  onClick={() => setOpenChatModal(true)}>Start a conversation</StyledButton>

                </StyledChatHeader>
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