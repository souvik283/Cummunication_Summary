import express from "express"
import {checkUserLogin, checkManagerLogin} from "../middlewares/auth.middleware.js"
import { handleAddMemberToChannel, handleCreateChannel, handleDeleteChannel, handleRemoveMemberFromChannel } from "../controllers/channel.controller.js";

const router = express.Router();


router.post("/create/:projectId", checkManagerLogin, handleCreateChannel)
router.post("/delete/:channelId", checkManagerLogin, handleDeleteChannel)
router.post("/add/:channelId", checkManagerLogin, handleAddMemberToChannel)
router.post("/remove/:channelId", checkManagerLogin, handleRemoveMemberFromChannel)


export default router