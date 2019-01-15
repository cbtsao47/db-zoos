const express = require("express");
const server = express();
const configureMiddleware = require("../config/middleware");
const zoosRouter = require("../routes/zoosRouter");
const bearsRouter = require("../routes/bearsRouter");

configureMiddleware(server);

//routes
server.use("/zoos", zoosRouter);
server.use("/bears", bearsRouter);

module.exports = server;
