import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout,
    createManager,
    removeManager,
    createDeliveryManager
} from "../controllers"

import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", loginAdmin)
router.get("/logout", logout)
router.post("/createManager", Auth("ADMIN"), CreatUserValidator, createManager)
router.delete("/removeManager/:id", Auth("ADMIN"), removeManager)
router.post("/createDeliveryManager", Auth("ADMIN"), CreatUserValidator, createDeliveryManager)

export { router }