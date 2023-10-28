import express from "express";
import { deleteOnePost, insertOnePost, selectAllPost, selectOnePost } from "../controllers/post.js";
import { isUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", isUser, selectAllPost);
router.get("/select/:postId", isUser, selectOnePost);
router.post("/add", isUser, insertOnePost);
router.delete("/del/:postId", isUser, deleteOnePost);

export default router;