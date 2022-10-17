import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaSearch,
} from "react-icons/fa";
import { useGlobalContext } from "./context";

const PF = "http://localhost:5000/images/";

const Topbar = () => {
  const { auth, setAuth, loggedUser, setLoggedUser, navigate, base_url } =
    useGlobalContext();

  const logout = () => {
    setAuth(false);
    setLoggedUser(null);
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <nav className="top-bar">
      <div className="top-left">
        <FaFacebookSquare className="icon" />
        <FaTwitterSquare className="icon" />
        <FaInstagramSquare className="icon" />
      </div>

      <div className="top-center">
        <ul className="top-list">
          <Link to="/home" className="list-item">
            home
          </Link>

          <Link to="/settings" className="list-item">
            settings
          </Link>
          <Link to="/write" className="list-item">
            write
          </Link>
          <Link to="/home" className="list-item" onClick={logout}>
            logout
          </Link>
        </ul>
      </div>
      <div className="top-right">
        {auth && loggedUser ? (
          <>
            <img
              className="profile-pic"
              src={PF + loggedUser.profilePic}
              alt={loggedUser.username}
            />
            <Link className="list-item" to="/settings">
              {loggedUser.username}
            </Link>
          </>
        ) : (
          <>
            <Link className="list-item" to="/">
              Login
            </Link>
            <Link className="list-item" to="/register">
              Register
            </Link>
          </>
        )}

        <FaSearch className="icon search" />
      </div>
    </nav>
  );
};

export default Topbar;
