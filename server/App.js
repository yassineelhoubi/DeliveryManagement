import express from "express";
require("dotenv").config();
import expressvalidator from "express-validator";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db"
connectDB()
import { adminRouter } from "./src/api/routes";

const host = process.env.host;
const port = process.env.port;

const app = express();


app.use(express.json());
app.use(expressvalidator());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRouter);

app.listen(port, () => {
  console.log(`Running on http://${host}:${port}`);
});