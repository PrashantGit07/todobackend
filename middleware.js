import mongoose from "mongoose";
import ConnectDb from "./utils/ConnectDb";

export const ensureDbConnection = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await ConnectDb();
        }
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(503).json({ message: "Database connection failed" });
    }
};