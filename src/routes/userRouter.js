import { health } from "../controllers/healthcheck.js";
import { register } from "../controllers/userControler.js";

import { Router } from "express";


const router = Router()

router.route("/register").post(register)
router.route("/health").get(health)

export {
    router
}