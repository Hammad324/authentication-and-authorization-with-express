import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.router.js";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(userRouter)

export { app }