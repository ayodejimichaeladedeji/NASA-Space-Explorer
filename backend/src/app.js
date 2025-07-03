import errorHandler from "./middlewares/errorHandler.js";
import apiRoutes from "./modules/index.routes.js";

import cors from 'cors';
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import { updateCacheAndPreventRenderSleep } from "./jobs/scheduler.js";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173" }));

updateCacheAndPreventRenderSleep();

app.use("/api", apiRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hahaha");
});

export default app;
