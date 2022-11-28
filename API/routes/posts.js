import { Router } from "express";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
import {
  createPost,
  updatePost,
  deletePost,
  addLike,
  getPost,
  getTimeline,
  userAllPosts,
} from "../controllers/postController.js";

const router = Router();

//CREATE POST
router.post("/create/:userId", verifyUser, createPost);
// router.post("/create",createPost);

//UPDATE POST
// router.put("/update/:id", verifyUser, updatePost);

//DELETE POST
// router.delete("/delete/:id", verifyUser, deletePost);

//Like POST
router.put("/like/:postid", addLike);

//GET POST
router.get("/post/:id", getPost);

//TIMELINE POSTS
router.get("/timeline/:userId", getTimeline);

//USER'S ALL POSTS
router.get("/profile/:username", userAllPosts);

export default router;
