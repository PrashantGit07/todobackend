import TodoModel from "../model/todoModel.js";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const CreateTodo = async (req, res) => {
    try {
        const { todo } = req.body;
        const token = req.headers.authorization?.split(" ")[1];


        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        if (!todo) {
            return res.status(400).json({ message: "Todo is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newTodo = new TodoModel({
            title: todo,
            createdBy: userId
        });

        await newTodo.save();

        console.log(newTodo);

        res.status(200).json({
            message: "Todo created successfully",
            todo: newTodo
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

export default CreateTodo;
