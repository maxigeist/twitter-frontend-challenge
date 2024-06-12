import {StyledModalContainer} from "../../modal/ModalContainer";
import {useEffect, useState} from "react";
import {Author} from "../../../service";
import {StyledBlurredBackground} from "../../common/BlurredBackground";
import {useHttpRequestService} from "../../../service/HttpRequestService";
import {ModalCloseButton} from "../../common/ModalCloseButton";
import {StyledCreateChatModal, StyledOption, StyledSelectBox} from "./StyledSelectBox";
import {StyledH5, StyledP} from "../../common/text";
import {StyledInput} from "../../styled-input/StyledInput";
import {InputContainerSize} from "../../styled-input/InputContainer";
import StyledButton, {ButtonSize, ButtonVariant} from "../../styled-button/StyledButton";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {updateToastData} from "../../../redux/toast";
import {ToastType} from "../../toast/Toast";
import {updateChats} from "../../../redux/socket";
import chat from "../Chat";


interface ChatModalProps {
    onClose: () => void;
}

const CreateChatModal = ({onClose}: ChatModalProps) => {

    const [followed, setFollowed] = useState<Author[]>()
    const [membersId, setMembersId] = useState<string[]>([])
    const [chatName, setChatName] = useState<string>('');
    const service = useHttpRequestService()
    const dispatch = useAppDispatch()
    const chats = useAppSelector((state)=> state.socket.chats)

    const handleGetFollowed = async () => {
        const followed = await service.getUserFollowed()
        setFollowed(followed)
    }

    const handleAddMember = async (event: any) => {
        !membersId.includes(event.target.value) ?
            setMembersId([...membersId, event.target.value]) : setMembersId(membersId.filter((id) => id !== event.target.value))
    }

    const handleChatName = async (event: any) => {
        setChatName(event.target.value)
    }

    const handleCreatChat = async () => {
        try{
            await service.createChat(membersId, chatName)
            dispatch(updateChats([...chats, chat]))
        }catch (error){
            dispatch(updateToastData({message:'The chat already exists', type: ToastType.ALERT}))
        }

        onClose()
    }


    useEffect(() => {
        handleGetFollowed().then()
    }, []);


    return (
        <StyledBlurredBackground>
            <StyledModalContainer>
                <StyledCreateChatModal>
                    <ModalCloseButton onClick={onClose}/>
                    <StyledH5>Create Chat</StyledH5>
                    <StyledP primary>Select members</StyledP>
                    <StyledSelectBox multiple>
                        {followed?.map((author) =>
                            <StyledOption value={author.id} selected={membersId.includes(author.id)}
                                          onClick={(event) => handleAddMember(event)}>
                                {author.username}
                            </StyledOption>
                        )}
                    </StyledSelectBox>
                    {membersId.length > 1 &&
                        <StyledInput placeholder={'Type chat group name...'} sizing={InputContainerSize.MEDIUM}
                                     onChange={(event) => handleChatName(event)}></StyledInput>}
                    {membersId.length > 0 && <StyledButton size={ButtonSize.SMALL}
                                                           buttonVariant={ButtonVariant.FULFILLED}
                                                           onClick={() => handleCreatChat()}>Create</StyledButton>}
                </StyledCreateChatModal>
            </StyledModalContainer>
        </StyledBlurredBackground>

    );


}
export default CreateChatModal