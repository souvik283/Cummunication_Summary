import express from "express";
import ENV from "./lib/env.js";
import ConnectDb from "./config/connectDb.js";
import path from "path";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import projectRoute from "./routes/project.route.js"
import  channelRoute  from "./routes/channel.route.js";
import summaryRoute from "./routes/summary.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";

// import {app, server} from "./lib/socket.js"

const app = express()

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// const corsLink = ENV.node_environment === "development" ? ENV.client_url : ENV.host_web_url

// app.use(cors({ origin: corsLink, credentials: true }));

const __dirname = path.resolve();

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/project", projectRoute);
app.use("/api/channel", channelRoute);
app.use("/api/summary", summaryRoute);

const PORT = ENV.port|| 3000;


app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
  ConnectDb();
});