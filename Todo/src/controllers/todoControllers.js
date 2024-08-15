import { prisma } from "../index.js"


const getAllTodos = async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
}

const getTodoById = async (req, res) => {

    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
        where: { id: Number(id) },
    });
    res.json(todo);
}


const createTodo = async (req, res) => {
    const { title } = req.body;
    const todo = await prisma.todo.create({
        data: { title },
    });
    res.json(todo);
}


const updateTodoByID = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await prisma.todo.update({
        where: { id: Number(id) },
        data: { title, completed },
    });
    res.json(todo);
}

const deleteTodoById = async (req, res) => {
    const { id } = req.params;
    await prisma.todo.delete({
        where: { id: Number(id) },
    });
    res.sendStatus(204);
}

export {
    getAllTodos,
    getTodoById,
    createTodo, updateTodoByID,
    deleteTodoById
}