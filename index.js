import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import ConnectDb from "./utils/ConnectDb.js"
import router from "./route/registerUser.js"
import todoRouter from "./route/todoRoutes.js"
import cookieParser from "cookie-parser"
import ensureDbConnection from "./middleware/dbConnection.js"


dotenv.config()

const app = express()
// ConnectDb();
// app.use(cookieParser());

// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json())

// app.use("/api/user", router)

// app.use("/api/todo", todoRouter)



// const PORT = process.env.PORT || 3001

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })

// Initialize middleware
app.use(cookieParser());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

// Ensure database connection for all requests
app.use(ensureDbConnection);

app.use("/api/user", router)

app.use("/api/todo", todoRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ message: err.message || "Internal server error" });
});

const startServer = async () => {
    try {
        // Initial DB connection
        await ConnectDb();

        const PORT = process.env.PORT || 3001

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer();