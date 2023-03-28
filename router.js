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

/////////////EXTRAS
//EXTRA: create a user route that will return all the orders of a user
router.get("/user/:id/orders", async (req, res) => {
  const { id } = req.params.id;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM orders WHERE user_id=$1;",
      [req.params.id]
    );
    res.json({ data: rows });
  } catch (err) {
    res.sendStatus(404);
  }
});

module.exports = router;
