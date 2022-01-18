import express from "express";
const router = express.Router();


import { loginAdmin } from "../controllers"

router.post("/login", loginAdmin)

export { router }