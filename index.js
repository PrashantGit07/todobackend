import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import ConnectDb from "./utils/ConnectDb.js"
import router from "./route/registerUser.js"
import todoRouter from "./route/todoRoutes.js"
import cookieParser from "cookie-parser"


dotenv.config()

const app = express()

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:8081",
    credentials: true
}))
app.use(express.json())

app.use("/api/user", router)

app.use("/api/todo", todoRouter)

ConnectDb();

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})