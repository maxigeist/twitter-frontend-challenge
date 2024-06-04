import React, {ReactNode} from "react";
import {StyledBlurredBackground} from "../common/BlurredBackground";
import {ModalCloseButton} from "../common/ModalCloseButton";
import {StyledTweetModalContainer} from "../tweet-modal/TweetModalContainer";

interface PostModalProps {
    onClose: () => void;
    show: boolean;
    children: ReactNode;
}

export const PostModal = ({onClose, show, children}: PostModalProps) => {

    const handleClick = (event: any) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return (
        <>
            {show && (
                <StyledBlurredBackground onClick={(event) => handleClick(event)}>
                    <StyledTweetModalContainer>
                        <ModalCloseButton onClick={onClose}/>
                        {children}
                    </StyledTweetModalContainer>
                </StyledBlurredBackground>
            )}
        </>
    );
};
