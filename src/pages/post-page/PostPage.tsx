import React, {useEffect, useState} from "react";
import {StyledContainer} from "../../components/common/Container";
import Tweet from "../../components/tweet/Tweet";
import Loader from "../../components/loader/Loader";
import TweetBox from "../../components/tweet-box/TweetBox";
import {StyledH5} from "../../components/common/text";
import {StyledFeedContainer} from "../home-page/components/contentContainer/FeedContainer";
import CommentFeed from "../../components/feed/CommentFeed";
import {Post} from "../../service";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {useParams} from "react-router-dom";

const PostPage = () => {
    const {id: postId} = useParams<string>();
    const [post, setPost] = useState<Post>();

    const service = useHttpRequestService();


    useEffect(() => {
        fetchPost()
    }, [postId]);


    const fetchPost = () => {
        service
            .getPostById(postId!!)
            .then((res) => {
                setPost(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }


    return (
        <StyledContainer borderRight={"1px solid #ebeef0"}>
            <StyledContainer
                padding={"16px"}
                borderBottom={"1px solid #ebeef0"}
                maxHeight={"53px"}
            >
                <StyledH5>Tweet</StyledH5>
            </StyledContainer>
            <StyledFeedContainer>
                {post ? (
                    <>
                        <Tweet post={post}/>
                        <StyledContainer
                            borderBottom={"1px solid #ebeef0"}
                            padding={"16px"}
                        >
                            <TweetBox parentId={postId}/>
                        </StyledContainer>

                        <StyledContainer minHeight={"53.5vh"}>
                            <CommentFeed postId={postId!!}/>
                        </StyledContainer>
                    </>
                ) : (
                    <StyledContainer justifyContent={"center"} alignItems={"center"}>
                        <Loader/>
                    </StyledContainer>
                )}
            </StyledFeedContainer>
        </StyledContainer>
    );

}

export default PostPage;
