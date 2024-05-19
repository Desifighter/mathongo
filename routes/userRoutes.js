import express from "express";
import {unsubscribe} from "../controllers/userController.js"

const router = express.Router();
router.put("/:userid",unsubscribe);
export default router;