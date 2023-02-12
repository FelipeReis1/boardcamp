import joi from "joi";

const rentalsSchema = joi.object({
  customerId: joi.number().positive().required(),
  gameId: joi.number().positive().required(),
  daysRented: joi.number().min(1).required(),
});

export default rentalsSchema;
