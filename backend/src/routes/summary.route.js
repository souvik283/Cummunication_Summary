import express from "express"
import { checkUserLogin } from "../middlewares/auth.middleware.js";
import { handleGenerateChannelSummary } from "../controllers/summery.controller.js";

const router = express.Router()

router.get("/:channelId", checkUserLogin, handleGenerateChannelSummary)

export default router;