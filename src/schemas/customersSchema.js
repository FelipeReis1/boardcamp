import joi from "joi";

const customersSchema = joi.object({
  name: joi.string().min(2).required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi
    .string()
    .regex(/^\d{11}$/)
    .required(),
  birthday: joi
    .string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
});

export default customersSchema;
