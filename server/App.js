import express from "express";
require("dotenv").config();
import cors from "cors";
import expressvalidator from "express-validator";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db"
connectDB()
import { adminRouter, managerRouter, deliveryManagerRouter, driverRouter ,authRouter} from "./src/api/routes";

const host = process.env.host;
const port = process.env.port;

const app = express();

app.use(cors())
app.use(express.json());
app.use(expressvalidator());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter);
app.use("/api/manager", managerRouter);
app.use("/api/deliveryManager", deliveryManagerRouter);
app.use("/api/driver", driverRouter);

app.listen(port, () => {
  console.log(`Running on http://${host}:${port}`);
});