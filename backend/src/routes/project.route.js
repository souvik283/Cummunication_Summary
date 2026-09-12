import express from "express" 
import {checkManagerLogin, checkUserLogin} from "../middlewares/auth.middleware.js"
import {handleProjectCreation, handleAddMember, handleDeleteMember} from "../controllers/project.controller.js"


const router = express.Router()

router.post("/create",checkManagerLogin, handleProjectCreation )
router.post("/add/:projectId",checkManagerLogin, handleAddMember )
router.post("/remove/:projectId",checkManagerLogin, handleDeleteMember )

export default router;