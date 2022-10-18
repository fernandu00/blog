import React from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaTwitterSquare,
  FaInstagramSquare,
  FaSearch,
  FaGithubSquare,
} from "react-icons/fa";
import { useGlobalContext } from "./context";

const Topbar = () => {
  const { auth, setAuth, loggedUser, setLoggedUser, navigate, base_url } =
    useGlobalContext();

  const logout = () => {
    setAuth(false);
    setLoggedUser(null);
    localStorage.removeItem("user");
    navigate("/home");
  };

  const PF = `${base_url}/images/`;
  return (
    <nav className="top-bar">
      <div className="top-left">
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
            {/* <img
              className="profile-pic"
              src={PF + loggedUser.profilePic}
              alt={loggedUser.username}
            /> */}
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
