import React, { useEffect, useState } from "react";
import { FaTwitterSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { useGlobalContext } from "./context";
const Sidebar = () => {
  const { getFilteredPosts, getCategories, categories, loggedUser, base_url } =
    useGlobalContext();
  const [about, setAbout] = useState("");
  const PF = `${base_url}/images/`;

  useEffect(() => {
    const getAbout = async () => {
      const res = await axios.get(`${base_url}/user/${loggedUser.id}`);
      setAbout(res.data.about);
    };
    getAbout();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <aside className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">about me</span>
        {loggedUser && (
          <img className="about-me" src={loggedUser.profilePic} alt="about" />
        )}

        <p className="about-text">{about && about}</p>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">categories</span>
        <ul className="sibebar-list">
          {categories.map((cat) => {
            return (
              <li
                className="sidebar-item"
                key={cat._id}
                onClick={() => getFilteredPosts(cat.name, "cat")}
              >
                {cat.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">follow us</span>
        <div className="sibebar-social">
          <a href="https://www.linkedin.com/in/fernando-de-paula-alves-profile/">
            <FaLinkedin className="icon" />
          </a>

          <a href="https://github.com/fernandu00">
            <FaGithubSquare className="icon" />
          </a>

          <a href="https://twitter.com/fernandu00">
            <FaTwitterSquare className="icon" />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
