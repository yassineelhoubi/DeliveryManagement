import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout
} from "../controllers"

router.post("/login", loginAdmin)
router.get("/logout", logout)

export { router }