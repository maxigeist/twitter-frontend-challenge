import React, {UIEventHandler, useEffect} from "react";
import {Post} from "../../service";
import {StyledContainer, StyledScrollableContainer} from "../common/Container";
import Tweet from "../tweet/Tweet";
import Loader from "../loader/Loader";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setLastPost, setQuery} from "../../redux/user";
import {LIMIT} from "../../util/Constants";

interface FeedProps {
    posts?: Post[];
    loading: boolean;
}

const Feed = ({posts, loading}: FeedProps) => {

    const dispatch = useAppDispatch()
    const lastPostId = useAppSelector((state) => state.user.lastPost)

    const handleScroll = (e: any) => {
        const bottom = (e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight < 1;

        if (bottom) {
            dispatch(setQuery(`?limit=${LIMIT}&after=${lastPostId}`))
        }
    }

    const handleSetLastPost = () => {
        dispatch(setLastPost(posts!![posts!!.length - 1].id))
    }

    useEffect(() => {
        if (posts!!.length > 0 && !loading) {
            handleSetLastPost()
        }
    }, [loading, dispatch]);

    return (
        <StyledScrollableContainer width={"100%"} alignItems={"center"} onScroll={handleScroll}>
            {loading && <Loader/>}
            {posts && posts
                .filter((post, index, self) => {
                    return self.findIndex((p) => p.id === post.id) === index;
                })
                .map((post: Post) => (
                    <Tweet key={post.id} post={post}/>
                ))}
        </StyledScrollableContainer>
    );
};

export default Feed;
