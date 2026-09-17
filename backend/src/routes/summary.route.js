import express from "express"
import { checkUserLogin } from "../middlewares/auth.middleware.js";
import { getLatestSummary, handleGenerateChannelSummary } from "../controllers/summery.controller.js";

const router = express.Router()

router.get("/:channelId", checkUserLogin, handleGenerateChannelSummary)
router.get("/get/:channelId", checkUserLogin, getLatestSummary)

export default router;