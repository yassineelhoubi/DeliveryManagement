import express from "express";
const router = express.Router();


import {
    createDeliveryManager,
    removeDeliveryManager,
    getAllDeliveryManagers,
    getDeliveryManager,
    UpdateDeliveryManager,
    createDriver,
    removeDriver,
    getAllDrivers,
    getDriver,
    UpdateDriver
} from "../controllers"
import {
    CreatUserValidator,
    Auth
} from "../middlewares"

// DeliveryManager
router.post("/createDeliveryManager", CreatUserValidator, createDeliveryManager);
router.delete("/removeDeliveryManager/:id", removeDeliveryManager);
router.get("/getAllDeliveryManagers", getAllDeliveryManagers);
router.get("/getDeliveryManager/:id", getDeliveryManager);
router.patch("/UpdateDeliveryManager/:id", UpdateDeliveryManager);
// Driver
router.post("/createDriver", Auth("MANAGER"), CreatUserValidator, createDriver);
router.delete("/removeDriver/:id", removeDriver);
router.get("/getAllDrivers", getAllDrivers);
router.get("/getDriver/:id", getDriver);
router.patch("/updateDriver/:id", UpdateDriver);

export { router }