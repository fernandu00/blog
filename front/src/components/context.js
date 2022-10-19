import React, { useEffect } from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const base_url = "https://fernandu00-blog.herokuapp.com";

// const base_url = "http://localhost:5000";

const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // recovers user info
  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser) {
      setLoggedUser(JSON.parse(recoveredUser));
    }
    setAuth(true);
    localStorage.setItem("auth", JSON.stringify(auth));
    setLoading(false);
  }, [auth]);

  // get filtered posts
  const getFilteredPosts = async (input, filter) => {
    setFilteredPosts([]);
    const res = await axios.get(`${base_url}/posts?${filter}=${input}`);
    const data = res.data;
    setFilteredPosts(data);
    navigate("/posts/filtered");
  };
  // fetch data function
  const getData = async () => {
    const response = await axios.get(`${base_url}/posts`);
    const data = response.data;

    setPosts(data);
  };

  // get posts data
  useEffect(() => {
    getData();
  }, []);

  // get categories
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await axios.get(`${base_url}/cat/`);
    setCategories(res.data.msg);
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        setPosts,
        getFilteredPosts,
        filteredPosts,
        setFilteredPosts,
        auth,
        setAuth,
        loggedUser,
        getData,
        base_url,
        setLoggedUser,
        navigate,
        getCategories,
        categories,
        setLoading,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
