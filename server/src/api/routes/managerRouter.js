import express from "express";
const router = express.Router();


import {
    login,
    logout,
    createDeliveryManager,
    removeDeliveryManager,
    getAllDeliveryManagers,
    getDeliveryManager,
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

router.post("/login", login)
router.get("/logout", logout)
// DeliveryManager
router.post("/createDeliveryManager", CreatUserValidator, createDeliveryManager);//create deliveryManager
router.delete("/removeDeliveryManager/:id", removeDeliveryManager);//delete deliveryManager
router.get("/getAllDeliveryManagers", getAllDeliveryManagers);//get all DeliveryManagers
router.get("/getDeliveryManager/:id", getDeliveryManager);//get a DeliveryManager by id
// Driver
router.post("/createDriver", Auth("MANAGER"), CreatUserValidator, createDriver);//creat a driver
router.delete("/removeDriver/:id", removeDriver);//remove a driver by id
router.get("/getAllDrivers", getAllDrivers);//get all drivers
router.get("/getDriver/:id", getDriver);//get a driver by id
router.patch("/updateDriver/:id", UpdateDriver);//get a driver by id

export { router }