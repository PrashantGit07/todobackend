import jwt from "jsonwebtoken";
import Todo from "../model/todoModel.js";
import ConnectDb from "../utils/ConnectDb.js";


const markAsComplete = async (req, res) => {
    try {
        await ConnectDb();

        const { id } = req.body;

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
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
            return res.status(404).json({ message: "Todo not found" })
        }

        todoExists.status = true;
        await todoExists.save();

        res.status(200).json({ message: "Todo marked as complete successfully" })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message })
    }
}

export default markAsComplete;