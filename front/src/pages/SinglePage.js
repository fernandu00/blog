import React from "react";
import Sidebar from "../components/Sidebar";
import SinglePost from "../components/SinglePost";

const SinglePage = () => {
  return (
    <main className="single-page">
      <SinglePost />
      <Sidebar />
    </main>
  );
};

export default SinglePage;
