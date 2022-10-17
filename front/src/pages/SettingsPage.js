import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { useGlobalContext } from "../components/context";
import axios from "axios";

const SettingsPage = () => {
  const { loggedUser, base_url, setLoggedUser } = useGlobalContext();
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [about, setAbout] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = `${base_url}/images/`;
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const updateUser = {
      userId: loggedUser.id,
      username: loggedUser.username,
      email: loggedUser.email,
      password: password,
      about: about,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePic = filename;

      try {
        await axios.post("http://localhost:5000/uploads", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const user = await axios.put(
        `${base_url}/user/${loggedUser.id}`,
        updateUser
      );
      setSuccess(true);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const msg = setTimeout(() => {
      setSuccess(false);
    }, 1000);

    return () => {
      clearTimeout(msg);
    };
  }, [success]);

  return (
    <main className="settings">
      <section className="settings-container">
        <div className="settings-title">
          <h1>update your account</h1>
          <h4>delete account</h4>
        </div>
        <div className="avatar">
          <h3>profile picture</h3>
          {file ? (
            <img
              className="profile-pic-settings"
              src={URL.createObjectURL(file)}
              alt="profile-pic"
            />
          ) : (
            <img
              className="profile-pic-settings"
              src={PF + loggedUser.profilePic}
              alt="profile-pic"
            />
          )}

          <label htmlFor="profile-file">
            <input
              type="file"
              id="profile-file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <FaUserCircle className="icon profile-icon" />
          </label>
        </div>
        <form className="form-update-settings">
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={loggedUser.username}
            onChange={(e) =>
              setLoggedUser({ ...loggedUser, username: e.target.value })
            }
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            defaultValue={loggedUser.email}
            onChange={(e) =>
              setLoggedUser({ ...loggedUser, email: e.target.value })
            }
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            required
            defaultValue={loggedUser.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="about-me">
            <textarea
              id="about-me"
              className="text-input"
              cols="50"
              rows="7"
              placeholder="Tell about you"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            ></textarea>
          </label>

          <button className="submit-btn update" onClick={handleUpdateUser}>
            update
          </button>
        </form>
        {success && <h2 className="succes-msg">profile updated!</h2>}
      </section>
      <Sidebar />
    </main>
  );
};

export default SettingsPage;
