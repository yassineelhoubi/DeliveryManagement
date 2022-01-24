import express from "express";
const router = express.Router();

import {
    login,
    logout,
    addDelivery
} from "../controllers"
import {
    Auth
} from "../middlewares"

router.post("/login", login)
router.get("/logout", logout)

// delivery
router.post("/addDelivery", Auth("DELIVERY_MANAGER"), addDelivery)


export { router }