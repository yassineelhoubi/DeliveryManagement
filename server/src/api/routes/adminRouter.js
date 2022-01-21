import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout,
    CreateManager
} from "../controllers"

router.post("/login", loginAdmin)
router.get("/logout", logout)
router.post("/createManager", CreateManager)

export { router }