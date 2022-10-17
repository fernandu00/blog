import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import { useGlobalContext } from "../components/context";
const Home = () => {
  const { getData } = useGlobalContext();
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header />
      <main className="home">
        <Posts />
        <Sidebar />
      </main>
    </>
  );
};

export default Home;
