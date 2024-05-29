import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import {useHttpRequestService} from "../../service/HttpRequestService";
import UserDataBox from "../user-data-box/UserDataBox";
import {useTranslation} from "react-i18next";
import {ButtonType} from "../button/StyledButton";
import "./FollowUserBox.css";
import {Author} from "../../service";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

interface FollowUserBoxProps {
    profilePicture?: string;
    name?: string;
    username?: string;
    id: string;
}

const FollowUserBox = ({
                           profilePicture,
                           name,
                           username,
                           id,
                       }: FollowUserBoxProps) => {
        const {t} = useTranslation();
        const service = useHttpRequestService()
        const user = useSelector((state: RootState) => state.userInfo);


        useEffect(() => {
                setIsFollowing(user?.following.some((f: Author) => f.id === id))
            }, []
        )
        ;


        const [isFollowing, setIsFollowing] = useState(false);

        const handleFollow = async () => {
            if (isFollowing) {
                await service.unfollowUser(id);
            } else {
                await service.followUser(id);
            }
            setIsFollowing(!isFollowing);
        };

        return (
            <div className="box-container">
                <UserDataBox
                    id={id}
                    name={name!}
                    profilePicture={profilePicture!}
                    username={username!}
                />
                <Button
                    text={isFollowing ? t("buttons.unfollow") : t("buttons.follow")}
                    buttonType={isFollowing ? ButtonType.DELETE : ButtonType.FOLLOW}
                    size={"SMALL"}
                    onClick={handleFollow}
                />
            </div>
        );
    }
;

export default FollowUserBox;
