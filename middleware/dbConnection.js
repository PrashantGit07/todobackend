import mongoose from "mongoose";
import ConnectDb from "../utils/ConnectDb.js";

/**
 * Middleware to ensure database connection before each request
 * Usage: app.use(ensureDbConnection);
 */
const ensureDbConnection = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log('DB not connected, connecting now...');
            await ConnectDb();
        }
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: "Database connection failed" });
    }
};

export default ensureDbConnection;
