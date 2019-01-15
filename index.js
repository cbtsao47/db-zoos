const express = require("express");
const helmet = require("helmet");
const zoosRouter = require("./routes/zoosRouter");
const bearsRouter = require("./routes/bearsRouter");
const server = express();
server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/", async (req, res) => {
  res.send("yo, you ok");
});
server.use("/zoos", zoosRouter);
server.use("/bears", bearsRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
