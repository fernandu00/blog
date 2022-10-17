import React, { useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";
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
          <img
            className="about-me"
            src={PF + loggedUser.profilePic}
            alt="about"
          />
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
          <FaFacebookSquare className="icon" />
          <FaTwitterSquare className="icon" />
          <FaInstagramSquare className="icon" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
