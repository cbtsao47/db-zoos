const express = require("express");
const knex = require("knex");
const helmet = require("helmet");
const knexConfig = require("./knexfile");
const server = express();
// const zoosRouter = require("./routes/zoosRouter");

const db = knex(knexConfig.development);
server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/zoos", async (req, res) => {
  try {
    res.json(await db("zoos"));
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post("/zoos", async (req, res) => {
  try {
    const result = await db("zoos").insert(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/zoos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("zoos").where({ id: id });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
server.delete("/zoos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("zoos")
      .where({ id: id })
      .del();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/zoos/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  try {
    const result = await db("zoos")
      .where({ id: id })
      .update(change);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
