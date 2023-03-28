const express = require("express");
const app = express();
const router = require("./router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Test Router");
});

app.use("/api", router);

module.exports = app;
