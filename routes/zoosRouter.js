const express = require("express");

const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const result = await db("zoos");
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
