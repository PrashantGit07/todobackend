import express from "express"
import CreateTodo from "../controller/createTodo.js"
import getAllTodos from "../controller/getAllTodos.js"
import updateTodo from "../controller/updateTodo.js"
import deleteTodo from "../controller/deleteTodo.js"
import markAsComplete from "../controller/markAsComplete.js"
const todoRouter = express.Router()


todoRouter.post("/addTodo", CreateTodo)
todoRouter.get("/get-all-todo", getAllTodos)
todoRouter.put("/update-todo", updateTodo)
todoRouter.delete("/delete-todo", deleteTodo)
todoRouter.put("/mark-as-complete", markAsComplete)
export default todoRouter