import {StyledModalContainer} from "../../modal/ModalContainer";
import {useEffect, useState} from "react";
import {Author} from "../../../service";


const CreateChatModal = () => {

    const [followed, setFollowed] = useState<Author[]>()

    const handleGetFollowed = () => {
        setFollowed([])
    }


    useEffect(() => {

    }, []);


    return (
        <StyledModalContainer>
            <h1>Create a conversation</h1>
        </StyledModalContainer>

    );



}
export default CreateChatModal