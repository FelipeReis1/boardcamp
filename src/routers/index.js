import { Router } from "express";
import gamesRouter from "./gamesRouter.js";
import customersRouter from "./customersRouter.js";
const route = Router();

route.use(gamesRouter);
route.use(customersRouter);

export default route;
