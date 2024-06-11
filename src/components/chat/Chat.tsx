import {useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {MessageDTO} from "../../service";
import {socket} from "../../socket/socket";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import StyledMessageContainer, {MessageType, MessageWrapper, StyledMessageP, StyledMessageSender} from "./UserMessage";
import {updateCurrentChatMessages} from "../../redux/socket";
import {StyledScrollableContainer} from "../common/Container";
import {StyledChatPageContainer} from "./ChatPageContainer";
import {StyledChatMessagesContainer} from "./ChatMessagesContainer";
import {StyledChatBottomBar} from "./ChatBottomBar";
import {StyledInput} from "../styled-input/StyledInput";
import StyledButton, {ButtonSize, ButtonVariant} from "../styled-button/StyledButton";
import {InputContainerSize} from "../styled-input/InputContainer";
import chat from "./Chat";


const Chat = () => {
    const {id: chatId} = useParams()
    const chatInfo = useAppSelector((state) => state.socket.currentChat)
    const [message, setMessage] = useState<string>()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.userInfo)


    const onMessage = async (message: MessageDTO) => {
        dispatch(updateCurrentChatMessages([message, ...chatInfo!!.messages]));
    }

    const handleSubmitMessage = async () => {
        socket.emit('send message', {content: message, conversationId: chatId})
        setMessage('')
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }


    useEffect(() => {
        socket.on('receive message', onMessage)
        console.log(chatInfo)
    }, [chatInfo!!.messages]);


    return (
        <StyledChatPageContainer>
            <h1>{chatInfo!!.name}</h1>
                <StyledScrollableContainer>
                    <StyledChatMessagesContainer>
                        {chatInfo!!.messages?.map((message) => {
                            return (
                                <MessageWrapper
                                    type={message.sender.id === user.id ? MessageType.USER : MessageType.OTHER}>
                                    <StyledMessageContainer
                                        type={message.sender.id === user.id ? MessageType.USER : MessageType.OTHER}>
                                        <StyledMessageSender>{chatInfo!!.members?.length > 2 && message.sender.id !== user.id && message.sender.username}</StyledMessageSender>
                                        <StyledMessageP>{message.content}</StyledMessageP>
                                    </StyledMessageContainer>
                                </MessageWrapper>
                            )
                        })}
                    </StyledChatMessagesContainer>
                </StyledScrollableContainer>
                <StyledChatBottomBar>
                    <StyledInput sizing={InputContainerSize.MEDIUM} placeholder={'Type a message'}
                                 onChange={handleInputChange} value={message}></StyledInput>
                    <StyledButton type={'submit'} size={ButtonSize.SMALL} buttonVariant={ButtonVariant.SUCCESS}
                                  onClick={handleSubmitMessage}>Send</StyledButton>
                </StyledChatBottomBar>

        </StyledChatPageContainer>
    );


}
export default Chat