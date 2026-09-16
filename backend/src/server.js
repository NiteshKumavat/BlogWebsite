import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "./libs/env.js";
import { connectDB } from "./libs/db.js";

import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json({limit: '10mb'}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
    methods : ["GET", "POST", "PUT", "DELETE"]
}));

app.use("/auth", authRoutes);


app.listen(ENV.PORT, () => {
    connectDB();
    console.log(`Server running at https://localhost:${ENV.PORT}`)
});