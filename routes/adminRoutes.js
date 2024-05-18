import express from "express";
import upload from "../middlewares/upload.js";
import {requireSignIn} from "../middlewares/authMiddleware.js"
import { addUsersFromCSV, addList } from "../controllers/adminController.js";

const router = express.Router();

router.post("/upload-csv",requireSignIn, upload, addUsersFromCSV);
router.post("/createlist", requireSignIn, addList);

export default router;
