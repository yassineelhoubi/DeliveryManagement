import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout,
    createManager,
    removeManager,
    getAllManagers,
    getManager,
} from "../controllers"

import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", loginAdmin)
router.get("/logout", logout)
router.post("/createManager", Auth("ADMIN"), CreatUserValidator, createManager)
router.delete("/removeManager/:id", Auth("ADMIN"), removeManager)
router.get("/getAllManagers", getAllManagers)
router.get("/getManager/:id", getManager)


export { router }