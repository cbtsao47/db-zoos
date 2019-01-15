const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");
const route = express.Router();

const db = knex(knexConfig.development);

route.get("/", async (req, res) => {
  try {
    res.json(await db("zoos"));
  } catch (err) {
    res.status(500).json(err);
  }
});

route.post("/", async (req, res) => {
  try {
    const result = await db("zoos").insert(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("zoos").where({ id });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("zoos")
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
    const result = await db("zoos")
      .where({ id })
      .update(change);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = route;
