import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT : process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    MONGODB_USER : process.env.MONGODB_USER,
    MONGODB_PASSWORD : process.env.MONGODB_PASSWORD,
    MONGODB_URI : process.env.MONGODB_URI
}