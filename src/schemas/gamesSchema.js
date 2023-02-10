import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string().min(2).required(),
  image: joi.string().optional(),
  stockTotal: joi.number().positive().greater(0).required(),
  pricePerDay: joi.number().positive().greater(0).required(),
});

export default gamesSchema;
