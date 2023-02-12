import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {
  try {
    const rentalsResult = await db.query(`SELECT * FROM rentals`);
    const customersResult = await db.query(`SELECT * FROM customers`);
    const gamesResult = await db.query(`SELECT * FROM games`);
    const rentals = rentalsResult.rows.map((r) => ({
      ...r,
      customer: {
        id: r.customerId,
        name: customersResult.rows.find((c) => c.id === r.customerId).name,
      },
      game: {
        id: r.gameId,
        name: gamesResult.rows.find((g) => g.id === r.gameId).name,
      },
    }));
    return res.send(rentals);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function createRent(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = new Date();
  try {
    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
    const originalPrice = game.rows[0].pricePerDay * daysRented;
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      customerId,
    ]);
    if (customer.rowCount === 0) {
      return res.sendStatus(400);
    }
    if (game.rowCount === 0) {
      return res.sendStatus(400);
    }
    if (daysRented <= 0) {
      return res.sendStatus(400);
    }

    await db.query(
      `INSERT INTO rentals ( "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function endRent(req, res) {
  const { id } = req.params;

  try {
    const rental = await db.query(
      `SELECT * FROM rentals \
    JOIN games on rentals."gameId" = games.id\
    WHERE rentals.id = $1;`,
      [id]
    );
    if (rental.rowCount === 0) {
      return res.sendStatus(404);
    }
    const { rentDate, daysRented, pricePerDay } = rental.rows[0];
    const rentalEnd = new Date();
    const delay =
      (rentalEnd.getTime() - rentDate.getTime()) / (24 * 60 * 60 * 1000) -
      daysRented;
    const fee = delay > 0 ? delay * pricePerDay : 0;

    await db.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2  WHERE id = $3`,
      [rentalEnd, fee, id]
    );

    res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function deleteRent(req, res) {
  const { id } = req.params;
  const rental = await db.query(
    `SELECT * FROM rentals WHERE rentals.id = $1;`,
    [id]
  );
  if (rental.rowCount === 0) {
    return res.sendStatus(404);
  }
  const { returnDate } = rental.rows[0];

  if (returnDate === null) {
    return res.sendStatus(400);
  }
  await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
  res.sendStatus(200);
}
