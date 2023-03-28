const { Router } = require("express");
const pool = require("./db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * from users");
    res.json({ data: rows });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
