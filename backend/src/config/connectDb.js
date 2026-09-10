import mongoose from "mongoose";
import ENV from "../lib/env.js";


async function ConnectDb() {
  try {
    // console.log(process.env.MONGO_URL);
    
    await mongoose.connect(ENV.mongoUrl) 

        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Database connection error", error)
        process.exit(1)
    }
}

export default ConnectDb