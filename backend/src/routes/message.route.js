import express, { Router } from "express"
import {checkUserLogin} from "../middlewares/auth.middleware.js"
import { handleGetMessage, handleSendMessage } from "../controllers/message.controller.js"

const router = express.Router()

router.post("/send/:channelId", checkUserLogin, handleSendMessage)
router.get("/:channelId", checkUserLogin, handleGetMessage)

export default router