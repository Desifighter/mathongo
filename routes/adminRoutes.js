import express from "express";
import upload from "../middlewares/upload.js";
import {requireSignIn} from "../middlewares/authMiddleware.js"
import {
  addUsersFromCSV,
  addList,
  getList,
  getUsers,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/upload-csv",requireSignIn, upload, addUsersFromCSV);
router.post("/createlist", requireSignIn, addList);
router.get("/getlist",requireSignIn,getList);
router.get("/getusers/:listid", requireSignIn, getUsers);

export default router;
