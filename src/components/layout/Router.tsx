import React, {useEffect} from "react";
import {createBrowserRouter, Outlet} from "react-router-dom";
import {StyledSideBarPageWrapper} from "../../pages/side-bar-page/SideBarPageWrapper";
import NavBar from "../navbar/NavBar";
import SignUpPage from "../../pages/auth/sign-up/SignUpPage";
import SignInPage from "../../pages/auth/sign-in/SignInPage";
import HomePage from "../../pages/home-page/HomePage";
import RecommendationPage from "../../pages/recommendation/RecommendationPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import TweetPage from "../../pages/create-tweet-page/TweetPage";
import CommentPage from "../../pages/create-comment-page/CommentPage";
import PostPage from "../../pages/post-page/PostPage";
import {PrivateRoute} from "../private-route/PrivateRoute";
import {PublicRoute} from "../public-route/PublicRoute";
import {updateData} from "../../redux/user.info";
import {useGetCurrentUser} from "../../query/queries";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import Toast from "../toast/Toast";
import ChatPage from "../../pages/chat/ChatPage";
import Chat from "../chat/Chat";
import {socket} from "../../socket/socket";
import {ChatViewDTO} from "../../service";
import {updateChats} from "../../redux/socket";

const WithNav = () => {
    return (
        <StyledSideBarPageWrapper>
            <NavBar/>
            <Outlet/>
        </StyledSideBarPageWrapper>
    );
};

const WithToast = () => {
    const toastProps = useAppSelector((state) => state.toast)

    return (
        <>
            <Toast message={toastProps.message} type={toastProps.type}></Toast>
            <Outlet/>
        </>
    )
}

const WithSocket = () => {
    const dispatch = useAppDispatch()
    const chats = useAppSelector((state) => state.socket.chats)

    const handleNewConnection = async (data: ChatViewDTO[]) => {
        dispatch(updateChats(data));
    };

    useEffect(() => {
        socket.on('new-connection', handleNewConnection);
    }, [chats]);

    return (
        <></>
    )

}

const WithUser = () => {

    const {isLoading, data} = useGetCurrentUser();
    const dispatch = useAppDispatch();
    const handleSetUpUser = async () => {
        if (!isLoading){
            dispatch(updateData(data))
        }
    }
    useEffect(() => {
        handleSetUpUser().then()
    }, [data]);

    return (
        <></>
    )


}

export const ROUTER = createBrowserRouter([
        {
            element: <WithToast/>,
            children: [
                {
                    element: <PublicRoute/>,
                    children: [

                        {
                            path: "/sign-up",
                            element: <SignUpPage/>,
                        },
                        {
                            path: "/sign-in",
                            element: <SignInPage/>,
                        },
                    ]
                },
                {
                    element: <PrivateRoute/>,
                    children: [
                        {
                            element: <><WithNav/><WithUser/><WithSocket/></>,
                            children: [
                                {
                                    path: "/",
                                    element: <HomePage/>,
                                },
                                {
                                    path: "/recommendations",
                                    element: <RecommendationPage/>,
                                },
                                {
                                    path: "/profile/:id",
                                    element: <ProfilePage/>,
                                },
                                {
                                    path: "/post/:id",
                                    element: <PostPage/>,
                                },
                                {
                                    path: "/compose/tweet",
                                    element: <TweetPage/>,
                                },
                                {
                                    path: "/post/:id",
                                    element: <CommentPage/>,
                                },
                                {
                                    path: "/chat",
                                    element: <ChatPage/>
                                },
                                {
                                    path: "/chat/:id",
                                    element: <Chat/>
                                }
                            ],

                        }]
                }
            ]
        }
    ])
;
