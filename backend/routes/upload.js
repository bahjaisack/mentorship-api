import express from "express";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { uploadFile } from "../controllers/upload.js";
const router = express.Router();

router.post("/profile-pic", protect, upload.single("file"), uploadFile);

export default router;
