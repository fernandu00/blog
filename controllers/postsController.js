const postModel = require("../models/Post");

// create post

const createPost = async (req, res) => {
  try {
    const { title, desc, username, categories, photo } = req.body;
    if (!title) {
      return res
        .status(500)
        .json({ success: false, msg: "title is mandatory" });
    }
    if (!desc) {
      return res
        .status(500)
        .json({ success: false, msg: "description is mandatory" });
    }
    if (!username) {
      return res
        .status(500)
        .json({ success: false, msg: "username is mandatory" });
    }
    const newPost = new postModel({ title, desc, username, categories, photo });
    await newPost.save(newPost);

    return res.status(201).json({
      msg: "success",
      data: newPost,
      id: newPost._id,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// update post

const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (req.body.username === post.username) {
      const updatedPost = await postModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(201).json({ success: true, msg: updatedPost });
    } else {
      res
        .status(401)
        .json({ success: false, msg: "you can only update your posts" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// delete post

const deletePost = async (req, res) => {
  try {
    const postToDelete = await postModel.findById(req.params.id);
    if (req.body.username === postToDelete.username) {
      await postModel.findByIdAndDelete(postToDelete);
      return res.status(201).json({ success: true, msg: "post deleted" });
    } else {
      res
        .status(401)
        .json({ success: false, msg: "you can only delete your posts" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//  get single post

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);
    res.status(201).json({ success: true, msg: post });
  } catch (error) {
    res.json(error);
  }
};

// get all posts

const getAllPosts = async (req, res) => {
  try {
    const username = req.query.user;
    const catName = req.query.cat;
    let posts;
    if (username) {
      posts = await postModel.find({ username });

      return res.status(200).json(posts);
    }
    if (catName) {
      posts = await postModel.find({
        categories: {
          $in: [catName],
        },
      });
      return res.status(200).json(posts);
    } else {
      posts = await postModel.find({});
    }
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getAllPosts,
};
