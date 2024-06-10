import {StyledH3, StyledP} from "../common/text";
import {ChatViewDTO} from "../../service";
import {StyledChatContainer} from "./ChatContainer"
import {socket} from "../../socket/socket";
import {useNavigate} from "react-router-dom";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {updateCurrentChat} from "../../redux/socket";
import user from "../../redux/user";
import {StyledH6} from "../common/text/H6";


const ChatPreview = ({name, lastMessage, picture, id}: ChatViewDTO) => {
    const navigate = useNavigate()
    const service = useHttpRequestService()
    const userInfo = useAppSelector((state) => state.userInfo)
    const dispatch = useAppDispatch()

    const handleOnClick = async () => {
        const chat = await service.getChat(id!!)
        dispatch(updateCurrentChat(chat))
        socket.emit('join room', {conversationId: id})
        navigate(`/chat/${id}`)
    }

    return (
        <>
            <StyledChatContainer onClick={() => handleOnClick()}>
                <StyledH6>{name}</StyledH6>
                <StyledP primary>{lastMessage?.sender.username === userInfo.username ? 'me' : lastMessage?.sender.username}:{lastMessage?.content}</StyledP>
            </StyledChatContainer>
        </>
    );


}

export default ChatPreview