const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const result = await db("bears");
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("bears").where({ id });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.post("/", async (req, res) => {
  try {
    const result = await db("bears").insert(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("bears")
      .where({ id })
      .del();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  try {
    const result = await db("bears")
      .where({ id })
      .update(change);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = route;
