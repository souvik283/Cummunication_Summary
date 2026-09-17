import express from "express" 
import {checkManagerLogin, checkUserLogin} from "../middlewares/auth.middleware.js"
import {handleProjectCreation, handleAddMember, handleDeleteMember, handleGetProjects, handleGetProject} from "../controllers/project.controller.js"


const router = express.Router()

router.post("/create",checkManagerLogin, handleProjectCreation )
router.post("/add/:projectId",checkManagerLogin, handleAddMember )
router.post("/remove/:projectId",checkManagerLogin, handleDeleteMember )
router.get("/",checkUserLogin, handleGetProjects )
router.get("/:projectId",checkUserLogin, handleGetProject )

export default router;