import React, {useEffect, useState} from "react";
import ProfileInfo from "./ProfileInfo";
import {useNavigate, useParams} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import {useTranslation} from "react-i18next";
import {User} from "../../service";
import {ButtonType} from "../../components/button/StyledButton";
import {useHttpRequestService} from "../../service/HttpRequestService";
import Button from "../../components/button/Button";
import ProfileFeed from "../../components/feed/ProfileFeed";
import {StyledContainer} from "../../components/common/Container";
import {StyledH5} from "../../components/common/text";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RootState} from "../../redux/store";

import {useGetUserProfile, useMutateOnFollow, useMutateOnUnfollow} from "../../query/queries";
import {updateToastData} from "../../redux/toast";
import {ToastType} from "../../components/toast/Toast";

const ProfilePage = () => {
    const [following, setFollowing] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalValues, setModalValues] = useState({
        text: "",
        title: "",
        type: ButtonType.DEFAULT,
        buttonText: "",
    });
    const service = useHttpRequestService()
    const user = useAppSelector((state: RootState) => state.userInfo);
    const dispatch = useAppDispatch();
    const id = useParams().id;
    const {isLoading, data} = useGetUserProfile(id)
    const {mutation: mutationUnfollow} = useMutateOnUnfollow()
    const {mutation: mutationFollow} = useMutateOnFollow()
    const navigate = useNavigate();
    const [profile, setProfile] = useState<User | undefined>();
    const {t} = useTranslation();

    const handleButtonType = (): { component: ButtonType; text: string } => {
        if (profile?.id === user?.id)
            return {component: ButtonType.DELETE, text: t("buttons.delete")};
        if (following)
            return {component: ButtonType.OUTLINED, text: t("buttons.unfollow")};
        else return {component: ButtonType.FOLLOW, text: t("buttons.follow")};
    };

    const handleSubmit = () => {
        if (profile?.id === user?.id) {
            service.deleteProfile().then(() => {
                localStorage.removeItem("token");
                navigate("/sign-in");
            });
        } else {
            mutationUnfollow.mutate(profile?.id!!)
            setShowModal(false)
        }
    };

    useEffect(() => {
        getProfileData().then();
    }, [id, data]);

    if (!id) return null;

    const handleButtonAction = async () => {
        if (profile?.id === user?.id) {
            setShowModal(true);
            setModalValues({
                title: t("modal-title.delete-account"),
                text: t("modal-content.delete-account"),
                type: ButtonType.DELETE,
                buttonText: t("buttons.delete"),
            });
        } else {
            if (following) {
                setShowModal(true);
                setModalValues({
                    text: t("modal-content.unfollow"),
                    title: `${t("modal-title.unfollow")} @${profile?.username}?`,
                    type: ButtonType.FOLLOW,
                    buttonText: t("buttons.unfollow"),
                });
            } else {
                mutationFollow.mutate(profile?.id!!)
            }
            return await getProfileData();
        }
    };

    const getProfileData = async () => {
        setProfile(data)
        setFollowing(data?.followers.length!! > 0)
        data?.followers.length === 0 && data?.id !== user.id && data.private  && dispatch(updateToastData({message: 'You need to follow this user to see its content',type: ToastType.ALERT}))
    };

    return (
        <>
            <StyledContainer
                maxHeight={"100vh"}
                borderRight={"1px solid #ebeef0"}
                flex={2}
                maxWidth={"600px"}
            >
                {profile && (
                    <>
                        <StyledContainer
                            borderBottom={"1px solid #ebeef0"}
                            maxHeight={"212px"}
                            padding={"16px"}
                        >
                            <StyledH5>{profile?.name}</StyledH5>
                            <StyledContainer
                                alignItems={"center"}
                                padding={"24px 0 0 0"}
                                flexDirection={"row"}
                            >
                                <ProfileInfo
                                    name={profile!.name!}
                                    username={profile!.username}
                                    profilePicture={profile!.profilePicture}
                                />
                                <Button
                                    buttonType={handleButtonType().component}
                                    size={"100px"}
                                    onClick={handleButtonAction}
                                    text={handleButtonType().text}
                                />
                            </StyledContainer>
                        </StyledContainer>
                        <StyledContainer width={"100%"}>
                            {profile.followers.length > 0 || !profile.private ? (
                                <ProfileFeed/>
                            ) : (
                                <StyledH5>Private account</StyledH5>
                            )}
                        </StyledContainer>
                        <Modal
                            show={showModal}
                            text={modalValues.text}
                            title={modalValues.title}
                            acceptButton={
                                <Button
                                    buttonType={modalValues.type}
                                    text={modalValues.buttonText}
                                    size={"MEDIUM"}
                                    onClick={handleSubmit}
                                />
                            }
                            onClose={() => {
                                setShowModal(false);
                            }}
                        />
                    </>
                )}
            </StyledContainer>
        </>
    );
};

export default ProfilePage;
