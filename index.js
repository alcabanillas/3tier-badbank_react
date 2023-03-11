// env variables
const dotenv = require('dotenv');
dotenv.config()

const express = require("express");
const app = express(); // create express app

// add cors support
const cors = require("cors");

app.set("port", process.env.PORT || 3001);

// add middlewares
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
