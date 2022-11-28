import Post from "../models/Post.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated");
    } else {
      next(createError(403, "You can update only your post"));
    }
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("The post has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const addLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postid);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(createError(404, "Post not found"));
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const getTimeline = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    const timelinePosts = userPosts.concat(...friendPosts);
    res.status(200).json(timelinePosts);
  } catch (err) {
    next(err);
  }
};

export const userAllPosts = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    if (!posts) return next(createError(403, "you don't have posts yet"));
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
