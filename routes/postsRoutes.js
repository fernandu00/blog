const postRouter = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getAllPosts,
} = require("../controllers/postsController");

postRouter.post("/new", createPost);

postRouter.put("/:id", updatePost);
postRouter.get("/:id", getSinglePost);
postRouter.get("/", getAllPosts);
postRouter.delete("/:id", deletePost);

module.exports = postRouter;
