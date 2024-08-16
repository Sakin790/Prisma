import express from "express"
import "dotenv/config"
import { router } from "./routes/userRouter.js"
import cors from "cors";

const PORT = process.env.PORT || 8080
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);


app.get("/", (req, res) => {
    res.status(200).json({
        message: "OK All Working...."
    })
})

app.use("/api/user/v1", router)

app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
})