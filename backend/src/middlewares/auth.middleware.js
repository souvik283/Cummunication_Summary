import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import ENV from "../lib/env.js";

export async function checkUserLogin(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Login first then come",
      });
    }
    const user = jwt.verify(token, ENV.jwt_secret);
    const userAccount = await userModel.findById(user.id);

    if (!userAccount) {
      res.status(400).json({
        message: "Invalid user. Please re-login",
      });
    }

    req.user = userAccount;
    next();
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}


export async function checkManagerLogin(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Login first then come",
      });
    }
    const user = jwt.verify(token, ENV.jwt_secret);
    const userAccount = await userModel.findById(user.id);

    if (!userAccount) {
      res.status(400).json({
        message: "Invalid user. Please re-login",
      });
    }

    if(userAccount.position.toLowerCase() == "manager" || userAccount.position.toLowerCase() == "project manager"){
      req.user = userAccount;      
    next();
    }else{
      res.status(401).json({
        message: "Restricted Action. This action is olny handled by higher authority",
      })
    }

    
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
}