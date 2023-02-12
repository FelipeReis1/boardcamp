import { Router } from "express";
import gamesRouter from "./gamesRouter.js";
import customersRouter from "./customersRouter.js";
import rentalsRouter from "./rentalsRouter.js";
const route = Router();

route.use(gamesRouter);
route.use(customersRouter);
route.use(rentalsRouter);

export default route;
