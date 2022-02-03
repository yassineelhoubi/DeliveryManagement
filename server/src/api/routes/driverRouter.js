import express from "express";
const router = express.Router();


import {
    updateDeliveryStatus
} from "../controllers"

import {
    Auth
} from "../middlewares"

// delivery
router.patch("/updateDeliveryStatus/:id", Auth("DRIVER"), updateDeliveryStatus)
export { router }