import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: [true, "Email already exsits"],
      trim: true,
      lowercase: true,
    },  
    fullName: {
      type: String,
      required: [true, "Please provide your name"],
    },
    position:{
      type: String,
      default: "developer",
      required: true,
      trim: true,
    },
    employeeId: {
      type: Number,
      required: true,
      trim: true
    },
    company:{
      type: String,
      trim: true,
      default: ""
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [5, "Password should contain more then 6 charecter"],
      select: false,
    },
    profileImg: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
