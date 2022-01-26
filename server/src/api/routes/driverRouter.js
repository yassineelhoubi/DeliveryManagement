import express from "express";
const router = express.Router();


import {
    login,
    logout,
    updateDeliveryStatus
} from "../controllers"

import {
    Auth
} from "../middlewares"

router.post("/login", login)
router.get("/logout", logout)

// delivery
router.patch("/updateDeliveryStatus/:id", Auth("DRIVER"), updateDeliveryStatus)
export { router }