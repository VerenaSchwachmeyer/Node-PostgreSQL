const { Router } = require("express");
const pool = require("./db");

const router = Router();

router.get("/user", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from users");
    res.json({ data: rows });
  } catch (err) {
    res.sendStatus(500);
  }
});

//get user with certain id
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1;", [id]);
    res.json({ data: rows });
  } catch (err) {
    res.sendStatus(404);
    // use adequate error messages and numbers.
  }
});

//create a new user
router.post("/user", async (req, res) => {
  const { first_name, last_name, age } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
      [first_name, last_name, age]
    );
    res.json({ data: rows });
  } catch (e) {
    res.sendStatus(403);
  }
  res.end();
});

//to edit one user with the id
router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE users SET first_name=$1 WHERE id=$2 RETURNING *",
      [first_name, id]
    );
    res.json({ data: rows });
  } catch (e) {
    res.sendStatus(403);
  }
});

// delete an id
router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ message: `You have been deleted from our database. ID: ${id}` });
  } catch (err) {
    res.sendStatus(404);
  }
});
module.exports = router;

/////// ORDERS
// get all orders
router.get("/order", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from orders");
    res.json({ data: rows });
  } catch (err) {
    res.sendStatus(500);
  }
});

//get order with id
router.get("/order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM orders WHERE id=$1;", [
      id,
    ]);
    res.json({ data: rows });
  } catch (err) {
    res.sendStatus(404);
    // use adequate error messages and numbers.
  }
});

//create a new order
router.post("/order/", async (req, res) => {
  const { price, date, user_id } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO orders (price, date, user_id ) VALUES ($1, $2, $3) RETURNING *",
      [price, date, user_id]
    );
    res.json({ data: rows });
  } catch (e) {
    res.sendStatus(403);
  }
  res.end();
});

//to edit one orfer with the id
router.put("/order/:id", async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE orders SET price=$1 WHERE id=$2 RETURNING *",
      [price, id]
    );
    res.json({ data: rows });
  } catch (e) {
    res.sendStatus(403);
  }
});

// delete an order with an id
router.delete("/order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("DELETE FROM orders WHERE id=$1", [id]);
    res.json({
      message: `Your purchase has been removed from the shopping cart.`,
    });
  } catch (err) {
    res.sendStatus(404);
  }
});
