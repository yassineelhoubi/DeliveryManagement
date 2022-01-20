import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout,
    registerManager
} from "../controllers"

router.post("/login", loginAdmin)
router.get("/logout", logout)
router.post("/registerManager", registerManager)

export { router }