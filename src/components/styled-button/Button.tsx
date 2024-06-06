import React, {MouseEventHandler} from "react";
import {ButtonSize, ButtonVariant, StyledButton} from "./StyledButton";

interface ButtonProps {
    text: string;
    size: ButtonSize;
    buttonVariant: ButtonVariant;
    onClick?: MouseEventHandler;
    disabled?: boolean;
    type?: "button" | "submit" | "reset",
}

const Button = ({text, size, buttonVariant, onClick, disabled, type}: ButtonProps) => {
    return (
        <StyledButton type={type}
                      size={size}
                      buttonVariant={disabled ? ButtonVariant.DISABLED : buttonVariant}
                      disabled={buttonVariant === ButtonVariant.DISABLED || (disabled ? disabled : false)}
                      onClick={onClick}
        >
            {text}
        </StyledButton>
    );
};

export default Button;
