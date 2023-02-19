const express = require("express");
const app = express(); // create express app
const cors = require("cors");
var dal = require("./dal");
var authService = require("./authService")

app.set("port", process.env.PORT || 3001);

// add middlewares
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(cors());

app.use("/account", function (req, res, next) {
  dal
    .isConnected()
    .then(() => next())
    .catch((err) => res.status(500).send(err));
});

// create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  authService
    .createUser( { name: req.params.name, email: req.params.email, password: req.params.password })
    .then( (info) => {
      dal.create(req.params.email)
        .then( user => res.send(user))
        .catch( (err) => res.status(500).send(err))
      }
    )
    .catch((err) => res.status(500).send(err));
});

//get all data
app.get("/account/all", function (req, res) {
  dal
    .all()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// get balance
app.get("/account/balance/:email", function (req, res) {
  dal
    .getBalance(req.params.email)
    .then((data) => {
      res.send({balance : data});
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//deposit
app.post("/account/deposit/:email/:amount", function (req, res) {
  dal
    .deposit( req.params.email, Number(req.params.amount))
    .then( (data) => {
      res.send({balance: data})
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

//withdraw
app.post("/account/withdraw/:email/:amount", function (req, res) {
  dal
    .withdraw( req.params.email, Number(req.params.amount))
    .then( (data) => {
      res.send({balance: data})
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
