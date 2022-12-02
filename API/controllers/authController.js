import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (error) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));
    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifiedPassword)
      return next(createError(400, "Wrong password or Username"));
    const accessToken = Jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.REACT_APP_JWT,
      { expiresIn: "20min" }
    );
    const refreshJWT = Jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.REACT_APP_REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    await user.updateOne({ refreshToken: refreshJWT });

    const { password, isAdmin, refreshToken, ...otherDetails } = user._doc;
    res.cookie("jwt", refreshJWT, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ user: otherDetails, accessToken: accessToken });
  } catch (error) {
    next(error);
  }
};
