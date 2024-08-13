import express from "express"
import "dotenv/config"


const PORT = process.env.PORT ||8080
const app = express()

app.get("/", (req, res) => {
    res.status(200).json({
        message: "OK All Working...."
    })
})

app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
})