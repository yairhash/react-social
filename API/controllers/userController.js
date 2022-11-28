import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    next(err);
  }
};

export const followUser = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userToFollow.followers.includes(req.body.userId)) {
        await userToFollow.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        next(createError(403, "You already follow this user"));
      }
    } catch (error) {
      next(err);
    }
  } else {
    next(createError(403, "You cant follow yourself"));
  }
};

export const unfollowUser = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToUnfollow = await User.findById(req.params, id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await userToUnfollow.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
      } else {
        next(createError(403, "You dont follow this user"));
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(createError(403, "You cant unfollow yorself"));
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.query.id,
      {$set:{profilePicture:req.query.profilePicture}},{returnOriginal: false});
      console.log(updatedUser , ' up');
      res.status(200).json("yes")
  } catch (err) {
    next(err);
  }
};
