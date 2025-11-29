import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import TodoModel from "../model/todoModel.js";

const getAllTodos = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];


        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const userCheck = await User.findById(userId);
        if (!userCheck) {
            return res.status(404).json({ message: "User not found" });
        }

        const todos = await TodoModel.find({ createdBy: userId }).sort({ createdAt: -1 });


        res.status(200).json({
            message: "Todos fetched successfully",
            todos: todos
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
}

export default getAllTodos;