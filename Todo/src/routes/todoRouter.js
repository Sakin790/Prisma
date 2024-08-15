import {
    createTodo,
    deleteTodoById,
    getAllTodos, getTodoById,
    updateTodoByID
} from "../controllers/todoControllers.js"

import { Router } from "express"

const TodoRoute = Router()

TodoRoute.route("/create").post(createTodo)
TodoRoute.route("/all").get(getAllTodos)
TodoRoute.route("/delete/:id", deleteTodoById)
TodoRoute.route("/get/:id", getTodoById)
TodoRoute.route("/update/:id", updateTodoByID)

export {
    TodoRoute
}