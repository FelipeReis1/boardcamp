import { Router } from "express";
import gamesRouter from "./gamesRouter.js";

const route = Router();

route.use(gamesRouter);

export default route;
