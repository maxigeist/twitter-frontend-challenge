import React, {useEffect, useState} from "react";
import {createBrowserRouter, Outlet, useNavigate} from "react-router-dom";
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
import {useHttpRequestService} from "../../service/HttpRequestService";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import Toast from "../toast/Toast";

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
            <Toast message={toastProps.message} type={toastProps.type} show={toastProps.show}></Toast>
            <Outlet/>
        </>
    )
}


const WithUser = () => {
    const service = useHttpRequestService();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleSetUpUser = async () => {
        try {
            const data = await service.me();
            dispatch(updateData(data));
        } catch (e) {
            navigate("/sign-in");
        }
    }
    useEffect(() => {
        handleSetUpUser().then()
    }, []);

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
                            element: <><WithNav/><WithUser/></>,
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
                            ],

                        }]
                }
            ]
        }
    ])
;
