import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout,
    createManager,
    removeManager,
    getAllManagers,
    getManager,
    UpdateManager,
    getAllVehicleType,
    addVehicleType,
    getVehicleType,
    deleteVehicleType,
    updateVehicleType
} from "../controllers"

import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", loginAdmin)
router.get("/logout", logout)

// Manager
router.post("/createManager", Auth("ADMIN"), CreatUserValidator, createManager)
router.delete("/removeManager/:id", Auth("ADMIN"), removeManager)
router.get("/getAllManagers", getAllManagers)
router.get("/getManager/:id", getManager)
router.patch("/updateManager/:id", UpdateManager)

// VEHICLE TYPE 
router.get("/getAllVehicleType", getAllVehicleType);
router.post("/addVehicleType", addVehicleType);
router.get("/getVehicleType/:id", getVehicleType);
router.delete("/deleteVehicleType/:id", deleteVehicleType);
router.put("/updateVehicleType/:id", updateVehicleType);


export { router }