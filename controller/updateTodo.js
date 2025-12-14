import Todo from "../model/todoModel.js";
import jwt from "jsonwebtoken";
import ConnectDb from "../utils/ConnectDb.js";

const updateTodo = async (req, res) => {
    try {
        await ConnectDb();

        const { todo, id } = req.body;

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }


        if (!todo || !id) {
            return res.status(400).json({ message: "Todo and ID are required" })
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const userId = decoded.id;


        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const userTodo = await Todo.findOne({ createdBy: userId, _id: id });
        if (!userTodo) {
            return res.status(403).json({ message: "Forbidden" })
        }

        const todoExists = await Todo.findById(id);
        if (!todoExists) {
            console.log("todo not found");
            return res.status(404).json({ message: "Todo not found" })
        }

        const updatedTodo = await Todo.findByIdAndUpdate(id, { title: todo }, { new: true });

        res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo })
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}
export default updateTodo;