import { Router } from "express";
import {
  getRentals,
  createRent,
  endRent,
  deleteRent,
} from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/schemasValidator.js";
import rentalsSchema from "../schemas/rentalsSchema.js";
const route = Router();

route.get("/rentals", getRentals);
route.post("/rentals", validateSchema(rentalsSchema), createRent);
route.post("/rentals/:id/return", endRent);
route.delete("/rentals/:id", deleteRent);

export default route;
