import React from "react";
import { useGlobalContext } from "./context";
import Post from "./Post";

const Posts = () => {
  const { posts } = useGlobalContext();

  return (
    <div className="posts">
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </div>
  );
};

export default Posts;
