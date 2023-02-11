import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games");
    res.send(games.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const gameName = await db.query(
      `SELECT (name) FROM games WHERE name = $1`,
      [name]
    );

    if (gameName.rowCount !== 0) {
      return res.status(409).send("Esse nome já está registrado!");
    }

    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`,
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
