import express from "express";
const router = express.Router();

import {
    login,
    logout,
    addDelivery,
    removeDelivery,
    getDelivery,
    getAllDeliveries,
} from "../controllers"
import {
    Auth
} from "../middlewares"

router.post("/login", login)
router.get("/logout", logout)

// delivery
router.post("/addDelivery", Auth("DELIVERY_MANAGER"), addDelivery)
router.delete("/removeDelivery/:id", Auth("DELIVERY_MANAGER"), removeDelivery)
router.get("/getDelivery/:id", Auth("DELIVERY_MANAGER"), getDelivery)
router.get("/getAllDeliveries", Auth("DELIVERY_MANAGER"), getAllDeliveries)

export { router }