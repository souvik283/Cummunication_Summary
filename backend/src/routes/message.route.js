import express, { Router } from "express"
import {checkUserLogin} from "../middlewares/auth.middleware.js"
import {} from "../controllers/message.controller.js"

const router = express.Router()

router.post("/send/:channelId", checkUserLogin, )

export default router