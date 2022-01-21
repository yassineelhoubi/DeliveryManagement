import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout,
    CreateManager,
} from "../controllers"

import {
    CreatUserValidator,
} from "../middlewares"

router.post("/login", loginAdmin)
router.get("/logout", logout)
router.post("/createManager", CreatUserValidator, CreateManager)

export { router }