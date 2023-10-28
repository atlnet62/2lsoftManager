import express from "express";
import { addUser, delUser, refreshToken, selectAllUser, selectUser, signin, uptUser } from "../controllers/user.js";
import { sanitize } from "../middlewares/sanitize.js";
import { isAdmin, isUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", isAdmin, selectAllUser);
router.get("/select/:uuid", isAdmin, sanitize, selectUser);

router.post("/add", sanitize, addUser);
router.patch("/upt/:userUUID", isAdmin, sanitize, uptUser);
router.delete("/del/:userUUID", isAdmin, sanitize, delUser);

router.post("/signin", sanitize, signin);
router.post("/refreshToken", isUser, refreshToken);

export default router;
