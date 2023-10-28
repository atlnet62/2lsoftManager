import express from "express";
import { homepage } from "../controllers/home.js";
import { aboutMe } from "../controllers/aboutMe.js";
import { pageNotFound } from "../controllers/error.js";
import  postRoutes from "./post.routes.js";
import  userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/api/v1/home", homepage);
router.use("/api/v1/aboutme", aboutMe);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/post", postRoutes);

router.all("/*", pageNotFound);

export default router;
