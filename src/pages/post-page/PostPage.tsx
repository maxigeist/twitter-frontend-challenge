import React, {useEffect, useState} from "react";
import {StyledContainer} from "../../components/common/Container";
import Tweet from "../../components/tweet/Tweet";
import Loader from "../../components/loader/Loader";
import TweetBox from "../../components/tweet-box/TweetBox";
import {StyledH5} from "../../components/common/text";
import {StyledFeedContainer} from "../home-page/components/contentContainer/FeedContainer";
import CommentFeed from "../../components/feed/CommentFeed";
import {Post} from "../../service";
import {useParams} from "react-router-dom";
import {useGetPost} from "../../query/queries";

const PostPage = () => {
    const {id} = useParams<string>()
    const {data:post, isLoading} = useGetPost(id);


    return (
        <>
            <StyledContainer borderRight="1px solid #ebeef0">
                <StyledContainer
                    padding="16px"
                    borderBottom="1px solid #ebeef0"
                    maxHeight="53px"
                >
                    <StyledH5>Tweet</StyledH5>
                </StyledContainer>
                <StyledFeedContainer>
                    {post &&
                        <>
                            <Tweet post={post}/>
                            <StyledContainer borderBottom="1px solid #ebeef0" padding="16px">
                                <TweetBox parentId={id}/>
                            </StyledContainer>
                            <StyledContainer minHeight="53.5vh">
                                <CommentFeed postId={id!!}/>
                            </StyledContainer>
                        </>
                    }
                </StyledFeedContainer>
            </StyledContainer>
        </>
    );
};

export default PostPage;
