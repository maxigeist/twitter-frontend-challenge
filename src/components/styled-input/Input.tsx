import React, {ChangeEvent, useRef, useState} from "react";
import {InputContainerSize, StyledInputContainer} from "./InputContainer";
import {StyledInputTitle} from "./InputTitle";
import {StyledInput} from "./StyledInput";

interface InputWithLabelProps {
    name: string;
    sizing: InputContainerSize;
    type?: "password" | "text";
    value?: string;
    title: string;
    placeholder: string;
    required: boolean;
    error?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
                   name,
                   title,
                   placeholder,
                   required,
                   error,
                   onChange,
                   type = "text",
                   sizing,
                   value
               }: InputWithLabelProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = () => {
        setFocus(false);
    };

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <StyledInputContainer
            sizing={sizing}
            className={`${error ? "error" : ""}`}
            onClick={handleClick}
        >
            <StyledInputTitle
                className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
            >
                {title}
            </StyledInputTitle>
            <StyledInput
                sizing={sizing}
                name={name}
                type={type}
                required={required}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onChange}
                className={error ? "error" : ""}
                ref={inputRef}
                value={value}
            />
        </StyledInputContainer>
    );
};

export default Input;
