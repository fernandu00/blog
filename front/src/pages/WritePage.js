import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useGlobalContext } from "../components/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WritePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [pickedCat, setPickedCat] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const { loggedUser, getData, setPosts, posts, categories, base_url } =
    useGlobalContext();

  const handleCategory = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setPickedCat([...pickedCat, { catName: value, checked: checked }]);
    }
    if (!checked) {
      setPickedCat(pickedCat.filter((category) => category.catName !== value));
    }
    console.log(pickedCat);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: loggedUser.username,
      title,
      desc,
      categories: pickedCat.map((category) => category.catName),
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post(`${base_url}/uploads`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const post = await axios.post(`${base_url}/posts/new`, newPost);
      const postId = post.data.id;
      setTitle("");
      setDesc("");
      setFile("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="write">
      <div className="img-file">
        {file && (
          <img
            className="img-post"
            src={URL.createObjectURL(file)}
            alt="post-img"
          />
        )}
      </div>
      <form className="write-form">
        <div className="form-container">
          <label htmlFor="file-input">
            <FaPlus className="icon add-icon" />
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <input
            className="title-input"
            type="text"
            placeholder="title..."
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-container">
          <label htmlFor="text-input">
            <textarea
              id="text-input"
              className="text-input"
              cols="50"
              rows="7"
              placeholder="Tell your story"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></textarea>
          </label>
        </div>
        <h3 className="categories-heading"> Select post categories</h3>
        <div className="form-container-cat">
          {categories.map((cat) => {
            return (
              <div className="checkbox-container" key={cat._id}>
                <input
                  id={cat.name}
                  type="checkbox"
                  className="post-categories-input"
                  value={cat.name}
                  onChange={handleCategory}
                />
                <label htmlFor={cat.name} className="post-categories">
                  {cat.name}
                </label>
              </div>
            );
          })}
        </div>

        <button className="submit-btn" onClick={handlePostSubmit}>
          Publish
        </button>
      </form>
    </main>
  );
};

export default WritePage;
