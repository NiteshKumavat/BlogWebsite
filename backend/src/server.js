import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "./libs/ENV";

const app = express();


app.listen(ENV.PORT, () => {
    console.log(`Server running at https://localhost:${ENV.PORT}`)
});