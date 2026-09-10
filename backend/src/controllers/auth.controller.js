import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/jwtGenerator.js"


export async function signupHandler(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const minNumberofChars = 4;
    const maxNumberofChars = 10;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{6,10}$/;
    if (
      password.length < minNumberofChars ||
      password.length > maxNumberofChars
    ) {
      return res.status(400).json({
        message: "Password must consists min 4 charecter and max 10 charecter",
      });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "password should contain atleast one number and one special character",
      });
    }

    const emailRegex =
      /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    const user = await userModel.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        message:
          "You already have an account on this email. please try with another",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashPassword,
    });
    if (newUser) {

      return res.status(201).json({
        message: "Account created successfully",
        userNew:{
          name: fullName,
          email: email
        }
      });
    } else {
      return res.status(500).json({
        message: "Unable to get data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

export async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({
      email: email,
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "No user found with this Email",
      });
    }
    // console.log(user._id)

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Password does not match. Please enter the correct password",
      });
    }
    const token = await generateToken(user, res)
    return res.status(200).json({
      message: "Logged in successfully",
      user: { name: user.fullName,
      email: user.email,
      profileImg: user.profileImg}
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    })
  }
}


export async function logoutHandler(_, res) {
  res.cookie("jwt", "", {maxAge: 0})
  return res.status(200).json({
    message: "Logged out successfully"
  })
}


export async function updateNameHandler(req, res) {
  try {           
    const { name } = req.body
    if (!name) {
      return res.status(400).json({
        msg: "please enter your name first"
      })
    }
    

    await userModel.findByIdAndUpdate(req.user._id, {
      name: name
    })
    
      return res.status(200).json({
        msg: "Profile updated successfully",
      })

  } catch (error) {
    return res.status(400).json({
      message: "Internal srver errror"
      })
  }
}