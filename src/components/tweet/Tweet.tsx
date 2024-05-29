import React, {useState} from "react";
import {StyledTweetContainer} from "./TweetContainer";
import AuthorData from "./user-post-data/AuthorData";
import type {Post} from "../../service";
import {StyledReactionsContainer} from "./ReactionsContainer";
import Reaction from "./reaction/Reaction";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {IconType} from "../icon/Icon";
import {StyledContainer} from "../common/Container";
import ThreeDots from "../common/ThreeDots";
import DeletePostModal from "./delete-post-modal/DeletePostModal";
import ImageContainer from "./tweet-image/ImageContainer";
import CommentModal from "../comment/comment-modal/CommentModal";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

interface TweetProps {
    post: Post;
}

const Tweet = ({post}: TweetProps) => {
    const [actualPost, setActualPost] = useState<Post>(post);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
    const service = useHttpRequestService();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.userInfo);


    const handleReaction = async (type: string) => {
        const reacted = actualPost.userReactions.find(
            (r) => r.type === type
        );
        if (reacted) {
            await service.deleteReaction(reacted.id);
        } else {
            await service.createReaction(actualPost.id, type);
        }
        const newPost = await service.getPostById(post.id);
        setActualPost(newPost);
    };

    const hasReactedByType = (type: string): boolean => {
        return actualPost.userReactions.some(
            (r) => r.type === type
        );
    };

    return (
        <StyledTweetContainer>
            <StyledContainer
                style={{width: "100%"}}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                maxHeight={"48px"}
            >
                <AuthorData
                    id={post.author.id}
                    name={post.author.name ?? "Name"}
                    username={post.author.username}
                    createdAt={post.createdAt}
                    profilePicture={post.author.profilePicture}
                />
                {post.authorId === user?.id && (
                    <>
                        <DeletePostModal
                            show={showDeleteModal}
                            id={post.id}
                            onClose={() => {
                                setShowDeleteModal(false);
                            }}
                        />
                        <ThreeDots
                            onClick={() => {
                                setShowDeleteModal(!showDeleteModal);
                            }}
                        />
                    </>
                )}
            </StyledContainer>
            <StyledContainer onClick={() => navigate(`/post/${post.id}`)}>
                <p>{post.content}</p>
            </StyledContainer>
            {post.images && post.images!.length > 0 && (
                <StyledContainer padding={"0 0 0 10%"}>
                    <ImageContainer images={post.images}/>
                </StyledContainer>
            )}
            <StyledReactionsContainer>
                <Reaction
                    img={IconType.CHAT}
                    count={actualPost?.qtyComments}
                    reactionFunction={() =>
                        window.innerWidth > 600
                            ? setShowCommentModal(true)
                            : navigate(`/compose/comment/${post.id}`)
                    }
                    increment={0}
                    reacted={false}
                />
                <Reaction
                    img={IconType.RETWEET}
                    count={actualPost.qtyRetweets}
                    reactionFunction={() => handleReaction("retweet")}
                    increment={1}
                    reacted={hasReactedByType("retweet")}
                />
                <Reaction
                    img={IconType.LIKE}
                    count={actualPost.qtyLikes}
                    reactionFunction={() => handleReaction("like")}
                    increment={1}
                    reacted={hasReactedByType("like")}
                />
            </StyledReactionsContainer>
            <CommentModal
                show={showCommentModal}
                post={post}
                onClose={() => setShowCommentModal(false)}
            />
        </StyledTweetContainer>
    );
};

export default Tweet;
