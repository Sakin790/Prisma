import { register } from "../controllers/userControllers.js";
import { Router } from "express";


const router = Router()

router.route("/register").post(register)

export {
    router
}
