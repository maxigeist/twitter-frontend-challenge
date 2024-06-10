import React, {useEffect, useState} from "react";
import {StyledToastContainer} from "./ToastContainer";
import {AlertIcon, SuccessIcon} from "../icon/Icon";
import {useAppDispatch} from "../../redux/hooks";
import {updateMessage} from "../../redux/toast";

export enum ToastType {
    ALERT = "ALERT",
    SUCCESS = "SUCCESS"
}

export interface ToastProps {
    message: string;
    type: ToastType;
    show?: boolean;
}

const Toast = ({message, type, show}: ToastProps) => {
    const isShown = !!message
    const dispatch = useAppDispatch()
    const messagefunc = dispatch(updateMessage(message))
    const iconMap = {
        [ToastType.ALERT]: <AlertIcon/>,
        [ToastType.SUCCESS]: <SuccessIcon/>
    };

    const closeToast = () => {
        dispatch(updateMessage(''))
    }

    const toastIcon = iconMap[type] || null;


    return (
        <>
            {isShown && (
                <StyledToastContainer type={type} onClick={() => closeToast()}>
                    {toastIcon}
                    <p>{message}</p>
                </StyledToastContainer>
            )}
        </>
    );
};

export default Toast;
