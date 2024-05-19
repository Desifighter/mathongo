import express from "express";
import {unsubscribe} from "../controllers/userController.js"

const router = express.Router();
router.get("/:userid",unsubscribe);
export default router;