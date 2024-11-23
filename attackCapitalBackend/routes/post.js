import { Router } from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

router.get("/posts", getPosts);
router.post("/post", authenticateToken, createPost);

export default router;
