import express from "express";
const router = express.Router();

import {
    login,
    logout,
    addDelivery
} from "../controllers"


router.post("/login", login)
router.get("/logout", logout)

// delivery
router.post("/addDelivery", addDelivery)


export { router }