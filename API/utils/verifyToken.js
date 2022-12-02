import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return next(createError(401, "You are not authenticated."));
  const token = authHeaders.split(' ')[1];
  jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid."));
    req.user = user;
    next();
  });
};
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.userId === req.params.userId || req.body.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "You are not authorized."));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "You are not authorized."));
    }
  });
};
