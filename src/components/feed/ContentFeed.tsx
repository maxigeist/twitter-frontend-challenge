import React, {useEffect} from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";

const ContentFeed = () => {
  const { posts, loading } = useGetFeed();

  useEffect(() => {

  }, [loading]);

  return <Feed posts={posts} loading={loading}/>;
};
export default ContentFeed;
