import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "./context";
const Post = ({ post }) => {
  const { posts, base_url } = useGlobalContext();
  const PF = `${base_url}/images/`;

  // localhost:5000/posts?cat
  return (
    <article className="post">
      {post.photo && (
        <img className="post-img" src={PF + post.photo} alt="post-img" />
      )}

      <div className="post-info">
        <div className="post-cats">
          {post.categories.map((cat, index) => {
            return (
              <span className="post-cat" key={index}>
                {cat}
              </span>
            );
          })}
        </div>
        <Link className="list-item" to={`/posts/${post._id}`}>
          <span className="post-title">{post.title}</span>
        </Link>
        <hr />
        <span className="post-date">
          {new Date(post.createdAt).toDateString()}
        </span>

        <p className="post-desc">{`${post.desc.substring(0, 400)}...`}</p>
      </div>
    </article>
  );
};

export default Post;
