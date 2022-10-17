import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../components/context";

const RegisterPage = () => {
  const navigate = useNavigate();
  // register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { base_url } = useGlobalContext();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const user = await axios.post(`${base_url}/user/register`, {
      username,
      email,
      password,
    });
    console.log(user.data);
    navigate("/");
  };

  return (
    <main className="register">
      <form className="login-form register-form">
        <h1>register</h1>
        <label htmlFor="username">username</label>
        <input
          type="username"
          id="username"
          placeholder="your username.."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          placeholder="your e-mail.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="your password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="submit-btn register-btn"
          onClick={handleRegisterSubmit}
        >
          Register
        </button>
        <Link to="/" className="submit-btn login-btn-register">
          Login
        </Link>
      </form>
    </main>
  );
};

export default RegisterPage;
