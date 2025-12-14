import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDb from "./utils/ConnectDb.js";

dotenv.config();

const startServer = async () => {
    try {
        // 🔥 CONNECT FIRST
        await ConnectDb();

        const app = express();

        app.use(cookieParser());
        app.use(cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
        app.use(express.json());

        // 🔥 IMPORT ROUTES AFTER DB CONNECTION
        const router = (await import("./route/registerUser.js")).default;
        const todoRouter = (await import("./route/todoRoutes.js")).default;

        app.use("/api/user", router);
        app.use("/api/todo", todoRouter);

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
