const express = require("express");
const db = require("../data/dbConfig");
const route = express.Router();

const bearCheck = require("../common/bearCheck");

route.get("/", async (req, res) => {
  try {
    const result = await db("bears");
    if (result.length) {
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
    const result = await db("bears").where({ id });
    if (result.length) {
      res.json(result[0]);
    }
    res.status(404).json({ message: "Data Not Found" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

route.post("/", async (req, res) => {
  try {
    const result = await db("bears").insert(req.body);
    if (req.body.name.length > 0) {
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
    const check = await db("bears").where({ id });
    if (check.length) {
      await db("bears")
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
    const check = await db("bears").where({ id });
    if (check.length && change.length) {
      await db("bears")
        .where({ id })
        .update(change);
      res.status(202).json({ message: "Data has been updated" });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = route;
