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

router.get("/user/:id"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [
        id,
      ]);
      res.json({ data: rows });
    } catch (err) {
      res.sendStatus(404);
      // use adequate error messages and numbers.
    }
  };

module.exports = router;
