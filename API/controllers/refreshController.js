import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const handleRefreshToken = (req, res, next) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return next(createError(401, "no cookie"));
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  const foundUser = User.findOne({ refreshToken: refreshToken });
  if (!foundUser) return next createError(403, "Forbidden"));
  jwt.verify(
        refreshToken,
        process.env.REACT_APP_REFRESH_TOKEN,
        (err,user)=>{
            if (err || foundUser._id !== user.userId) return next(createError(403,'Invalid token'));
            const accessToken = jwt.sign(
                {userId:user.userId},
                process.env.REACT_APP_JWT,
                {expiresIn:"2min"}
            );
            res.json(accessToken);
        }
    );
};
