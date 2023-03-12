const express = require("express");
const app = express(); // create express app

// add cors support
const cors = require("cors");

app.use(cors(
  {
    origin: process.env.ALLOWED_ORIGINS
  }));

app.use(express.json())

var dal = require("./services/dal");

app.use("/", function (req, res, next) {
  // disable all requests if not connected to DB
  dal
    .isConnected()
    .then(() => next())
    .catch((err) => res.status(500).send(err));
});

var usersRouter = require('./routes/users');
app.use("/users", usersRouter)

var transactionsRouter = require('./routes/transactions')
app.use("/transactions", transactionsRouter)

module.exports = app;