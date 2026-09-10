import express from "express"
import {checkUserLogin} from "../middlewares/auth.middleware"


const router = express.Router();


router.post("/create", checkUserLogin, )


export default router