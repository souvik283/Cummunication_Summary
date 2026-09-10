import express from "express";
import {
  signupHandler,
  loginHandler,
  logoutHandler,
} from "../controllers/auth.controller.js";
import { checkUserLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupHandler);
router.post("/signin", loginHandler);
router.post("/logout", logoutHandler);

router.get("/check", checkUserLogin, (req, res) => {
  res.status(201).json({
    message: "LoggedIn user",
    user: req.user,
  });
});

export default router;
