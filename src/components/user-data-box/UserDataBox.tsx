import React from "react";
import Avatar from "../common/avatar/Avatar";
import icon from "../../assets/icon.jpg";
import {useNavigate} from "react-router-dom";
import {UserDataBoxContainer} from "./UserDataBoxContainer";
import {UserInfoContainer, UserInfoText} from "./UserInfoContainer";


interface UserDataBoxProps {
    name?: string;
    username?: string;
    profilePicture?: string;
    id: string;
    onClick?: () => void;
}

export const UserDataBox = ({
                                name,
                                username,
                                profilePicture,
                                id,
                                onClick,
                            }: UserDataBoxProps) => {
    const navigate = useNavigate();

    return (
        <UserDataBoxContainer onClick={onClick}>
            <Avatar
                width={"48px"}
                height={"48px"}
                src={profilePicture ?? icon}
                onClick={() => onClick ?? navigate(`/profile/${id}`)}
                alt={name ?? "Name"}
            />
            <UserInfoContainer>
                <UserInfoText>{name ?? "Name"}</UserInfoText>
                <UserInfoText style={{color: "#566370"}}>{"@" + username ?? "@Username"}</UserInfoText>
            </UserInfoContainer>
        </UserDataBoxContainer>

    );
};

export default UserDataBox;
