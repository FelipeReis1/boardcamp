import { Router } from "express";
import {
  getCustomers,
  getCustomersById,
  createCustomer,
  updateCustomer,
} from "../controllers/customersController.js";
import { validateSchema } from "../middlewares/schemasValidator.js";
import customersSchema from "../schemas/customersSchema.js";

const route = Router();

route.get("/customers", getCustomers);
route.get("/customers/:id", getCustomersById);
route.post("/customers", validateSchema(customersSchema), createCustomer);
route.put("/customers/:id", validateSchema(customersSchema), updateCustomer);

export default route;
