import express from "express";
const router = express.Router();

import {
    addDelivery,
    removeDelivery,
    getDelivery,
    getAllDeliveries,
    assignDelivery
} from "../controllers"
import {
    Auth
} from "../middlewares"

// delivery
router.post("/addDelivery", Auth("DELIVERY_MANAGER"), addDelivery)
router.delete("/removeDelivery/:id", Auth("DELIVERY_MANAGER"), removeDelivery)
router.get("/getDelivery/:id", Auth("DELIVERY_MANAGER"), getDelivery)
router.get("/getAllDeliveries", Auth("DELIVERY_MANAGER"), getAllDeliveries)
router.get("/assignDelivery/:id", assignDelivery)

export { router }