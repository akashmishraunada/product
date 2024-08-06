import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
    path: "./config/config.env",
});
const app = express();

// Using Middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// // Importing & Using Routes
import user from "./routes/UserRoutes.js";
import product from "./routes/ProductRoutes.js";

app.use("/api/v1", user);
app.use("/api/v1", product);


export default app;

// Using Error Middleware 
app.use(ErrorMiddleware);
