import { Router } from "express";
import { getGames, createGames } from "../controllers/gamesController.js";
import { gameValidator } from "../middlewares/schemasValidator.js";
import gamesSchema from "../schemas/gamesSchema.js";

const route = Router();

route.get("/games", getGames);
route.post("/games", gameValidator(gamesSchema), createGames);

export default route;
