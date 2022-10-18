import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useGlobalContext } from "./context";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const { postId } = useParams();
  const { posts, getFilteredPosts, getData, loggedUser, base_url } =
    useGlobalContext();
  const [currentPost, setCurrentPost] = useState("");

  const navigate = useNavigate();

  // const [postTitle, setPostTitle] = useState(currentPost.title);
  // const [postDesc, setPostDesc] = useState(currentPost.desc);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${base_url}/posts/${postId}`, currentPost);
    } catch (error) {
      console.log(error);
    }

    setIsUpdating(false);
  };

  useEffect(() => {
    getData();
    setCurrentPost(posts.find((post) => postId === post._id));
  }, []);

  const deletePost = async (id) => {
    try {
      await axios.delete(`${base_url}/posts/${id}`, {
        data: {
          username: loggedUser.username,
        },
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const PF = `${base_url}/images/`;
  return (
    <article className="single-post">
      <div className="single-post-container">
        {currentPost.photo && (
          <img
            className="single-post-img"
            src={currentPost.photo}
            alt="post-img"
          />
        )}

        {isUpdating ? (
          <input
            className="single-post-title-input"
            type="text"
            value={currentPost.title}
            autoFocus
            onChange={(e) =>
              setCurrentPost({ ...currentPost, title: e.target.value })
            }
          />
        ) : (
          <h1 className="single-post-title">
            {currentPost.title}
            {currentPost.username == loggedUser.username && (
              <div className="edit-icons">
                <FaEdit
                  className="post-icon edit"
                  onClick={() => setIsUpdating(true)}
                />
                <FaTrashAlt
                  className="post-icon delete"
                  onClick={() => deletePost(currentPost._id)}
                />
              </div>
            )}
          </h1>
        )}

        <div className="single-post-info">
          <h3
            className="single-post-author"
            onClick={() => getFilteredPosts(currentPost.username, "user")}
          >
            author: {currentPost.username}
          </h3>
          <h4 className="single-post-date">
            date: {new Date(currentPost.createdAt).toDateString()}
          </h4>
        </div>
        {isUpdating ? (
          <>
            <textarea
              className="single-post-desc-input"
              value={currentPost.desc}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, desc: e.target.value })
              }
            ></textarea>
            <button className="update-btn" onClick={handleUpdate}>
              update
            </button>
          </>
        ) : (
          <p className="single-post-desc">{currentPost.desc}</p>
        )}
      </div>
    </article>
  );
};

export default SinglePost;
