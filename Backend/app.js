import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import { config } from "dotenv";
import messageRouter from "./routes/message.router.js";
import userRouter from "./routes/user.router.js";
import appointmentRouter from "./routes/appointment.router.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

config({ path: "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["Get", "Post", "Put", "Patch", "Delete"],
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

app.use(errorMiddleware);

export default app;