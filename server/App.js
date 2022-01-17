import express from "express";
require("dotenv").config();
const app = express();
const host = process.env.host;
const port = process.env.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Running on http://${host}:${port}`);
});