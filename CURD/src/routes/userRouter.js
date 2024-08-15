
import { health } from "../controllers/healthCheck.js";
import { register, getUser, getSingleUserById, updateUserById, deleteUserById } from "../controllers/userControler.js";

import { Router } from "express";


const router = Router()

router.route("/register").post(register)
router.route("/health").get(health)
router.route("/getall").get(getUser)
router.route("/user/:id").get(getSingleUserById)
router.route("/user/:id").post(updateUserById)
router.route("/user/:id").delete(deleteUserById)

export {
    router
}