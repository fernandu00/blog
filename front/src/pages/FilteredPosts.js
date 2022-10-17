import React, { useState } from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import { useGlobalContext } from "../components/context";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

const FilteredPosts = () => {
  const { query } = useParams();
  const { filteredPosts } = useGlobalContext();
  return (
    <>
      <Header />
      <main className="home">
        <div className="posts">
          {filteredPosts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>
        <Sidebar />
      </main>
    </>
  );
};

export default FilteredPosts;
