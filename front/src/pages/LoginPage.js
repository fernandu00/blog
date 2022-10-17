import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../components/context";
import { useState } from "react";
import axios from "axios";

// login

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { base_url, setLoggedUser, setAuth, auth, loggedUser, navigate } =
    useGlobalContext();

  // login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }
    try {
      const user = await axios.post(`${base_url}/user/login`, {
        username,
        password,
      });
      if (user) {
        setLoggedUser({
          username: user.data.username,
          id: user.data.id,
          email: user.data.email,
          profilePic: user.data.profilePic,
        });
        console.log(loggedUser);
        setAuth(true);
        navigate("/home");
        console.log(auth);
        localStorage.setItem("user", JSON.stringify(user.data));
        localStorage.setItem("auth", JSON.stringify(auth));
        console.log(loggedUser);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.success === false) {
        setIsWrongCredentials(true);

        return;
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    const msg = setTimeout(() => {
      setIsWrongCredentials(false);
    }, 3000);

    return () => {
      clearTimeout(msg);
    };
  }, [isWrongCredentials]);

  return (
    <main className="login">
      <form className="login-form">
        <h1>login</h1>
        <label htmlFor="username">username</label>
        <input
          type="username"
          id="username"
          placeholder="your username"
          value={username}
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="your password.."
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-btn login-btn" onClick={handleLoginSubmit}>
          Login
        </button>
        <Link to="/register" className="register-link">
          register
        </Link>
        {isWrongCredentials && <p className="error-msg">wrong credentials!</p>}
      </form>
    </main>
  );
};

export default LoginPage;
