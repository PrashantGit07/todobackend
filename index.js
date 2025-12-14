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
await ConnectDb();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

app.use("/api/user", router)

app.use("/api/todo", todoRouter)



const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})