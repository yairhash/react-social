import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshController";

const router = Router();

router.get("/refresh", handleRefreshToken);

export default router;
