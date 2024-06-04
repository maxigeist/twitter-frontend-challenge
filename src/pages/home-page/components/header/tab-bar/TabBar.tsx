import React, { useEffect, useState } from "react";
import Tab from "./tab/Tab";
import { setQuery, updateFeed } from "../../../../../redux/user";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { StyledTabBarContainer } from "./TabBarContainer";
import { useGetLatestPosts } from "../../../../../query/queries";

const TabBar = () => {
    const [activeFirstPage, setActiveFirstPage] = useState(true);
    const dispatch = useAppDispatch();
    const [query, setQueryAux] = useState(useAppSelector((state) => state.user.query))
    const { isLoading, data: posts } = useGetLatestPosts(query);
    const { t } = useTranslation();

    const handleClick = (value: boolean, newQuery: string) => {
        setActiveFirstPage(value);
        setQueryAux(newQuery)
        dispatch(setQuery(newQuery));
    };

    useEffect(() => {
        if (!isLoading) {
            dispatch(updateFeed(posts));
        }
    }, [query, isLoading, posts, activeFirstPage]);


    if (isLoading) {
        return <h1>The page is loading</h1>;
    }

    return (
        <StyledTabBarContainer>
            <Tab
                active={activeFirstPage}
                text={t("header.for-you")}
                onClick={() => handleClick(true, "")}
            />
            <Tab
                active={!activeFirstPage}
                text={t("header.following")}
                onClick={() => handleClick(false, "following")}
            />
        </StyledTabBarContainer>
    );
};

export default TabBar;
