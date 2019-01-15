const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");
const route = express.Router();

const db = knex(knexConfig.development);

route.get("/", async (req, res) => {
  try {
    const result = await db("zoos");
    if (result.length > 0) {
      res.json(result);
    }
    res.status(404).json({ message: `Data Not Found` });
  } catch (err) {
    res.status(500).json(err);
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("zoos").where({ id });
    if (result.length > 0) {
      res.json(result[0]);
    }
    res.status(404).json({ message: "Data Not Found" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

route.post("/", async (req, res) => {
  try {
    const result = await db("zoos").insert(req.body);
    if (result.name.length > 0) {
      res.status(201).json({
        message: `The data has been created with the id of ${result}`
      });
    }
    res.status(406).json({ message: "Please include a name!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const check = await db("zoos").where({ id });
    if (check) {
      const result = await db("zoos")
        .where({ id })
        .del();
      res.status(202).json({ message: `Data has been deleted` });
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  try {
    const check = await db("zoos").where({ id });
    if (check) {
      const result = await db("zoos")
        .where({ id })
        .update(change);
      res.status(202).json({ message: "Data has been updated" });
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = route;
