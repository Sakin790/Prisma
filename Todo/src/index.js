import express from "express"
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { router } from "./routes/userRouters.js"
import cors from "cors";
import { TodoRoute } from "./routes/todoRouter.js";

const app = express()
const PORT = process.env.PORT || 9090




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);



const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})



app.use("/todos/user/v1", router)
app.use("/todos", TodoRoute)

app.listen(PORT, () => {
    console.log(`Server is Running At Port ${PORT}`);
})


export { prisma }