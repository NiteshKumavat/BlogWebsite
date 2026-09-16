import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async() => {
    try{
        const conn = await mongoose.connect(ENV.MONGODB_URI);
        console.log("Mongodb is connected : ", conn.connection.host);
    }catch(error){
        console.log(`Error connecting database : ${error}`)
        process.exit(1);
    }
}

