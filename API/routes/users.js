import { Router } from "express";
import { verifyUser,verifyAdmin } from "../utils/verifyToken.js";
import { updateUser,updateProfilePicture, deleteUser,getUser,followUser ,unfollowUser } from "../controllers/userController.js";

const router = Router();

//UPDATE USER
router.put("/update/:id",updateUser);

router.put("/updatePicture" , updateProfilePicture);


//DELETE
router.delete("/delete/:id", verifyUser, deleteUser);

//GET USER
router.get("/getuser" , getUser);

//FOLLOW USER 
router.put("/follow/:id" , followUser);

//UNFOLLOW USER 
router.put("/unfollow/:id" , unfollowUser );

export default router;
