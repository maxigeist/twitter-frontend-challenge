import React, {ChangeEvent, useRef, useState} from "react";
import {StyledInputContainer} from "./InputContainer";
import {StyledInputTitle} from "./InputTitle";
import {StyledInputElement} from "./StyledInputElement";

interface InputWithLabelProps {
    name: string;
    type?: "password" | "text";
    value?:string;
    title: string;
    placeholder: string;
    required: boolean;
    error?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput = ({
                          name,
                          title,
                          placeholder,
                          required,
                          error,
                          onChange,
                          type = "text",
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
            className={`${error ? "error" : ""}`}
            onClick={handleClick}
        >
            <StyledInputTitle
                className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
            >
                {title}
            </StyledInputTitle>
            <StyledInputElement
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

export default LabeledInput;
