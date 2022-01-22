import express from "express";
const router = express.Router();


import {
    login,
    logout,
    createDeliveryManager,
    removeDeliveryManager,
    createDriver,
    removeDriver,
    getAllDrivers
} from "../controllers"
import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", login)
router.get("/logout", logout)
router.post("/createDeliveryManager", Auth("MANAGER"), CreatUserValidator, createDeliveryManager)
router.delete("/removeDeliveryManager/:id", Auth("MANAGER"), removeDeliveryManager)
router.post("/createDriver", Auth("MANAGER"), CreatUserValidator, createDriver)
router.delete("/removeDriver/:id", removeDriver)
router.get("/getAllDrivers", getAllDrivers)

export { router }