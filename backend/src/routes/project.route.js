import express from "express" 
import {checkManagerLogin, checkUserLogin} from "../middlewares/auth.middleware"
import {handleProjectCreation} from "../controllers/project.controller"


const router = express.Router()

router.post("/create",checkManagerLogin, handleProjectCreation )

export default router;