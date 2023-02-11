import { Router } from "express";
import { getGames, createGames } from "../controllers/gamesController.js";
import { validateSchema } from "../middlewares/schemasValidator.js";
import gamesSchema from "../schemas/gamesSchema.js";

const route = Router();

route.get("/games", getGames);
route.post("/games", validateSchema(gamesSchema), createGames);

export default route;
