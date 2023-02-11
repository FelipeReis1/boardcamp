import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
  try {
    const customers = await db.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getCustomersById(req, res) {
  const { id } = req.params;
  try {
    const customer = await db.query(
      `SELECT * FROM customers WHERE id = '${id}'`
    );
    if (customer.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.send(customer.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    const customerCpf = await db.query(
      `SELECT (cpf) FROM customers WHERE cpf = '${cpf}'`
    );
    if (customerCpf.rowCount !== 0) {
      return res.status(409).send("Esse cpf já está registrado!");
    }
    await db.query(
      `INSERT INTO customers (name, phone, "cpf", "birthday") VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')`
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;
  try {
    await db.query(
      `UPDATE customers SET name='${name}', phone ='${phone}', cpf ='${cpf}', birthday = '${birthday}' WHERE id = ${id};`
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
