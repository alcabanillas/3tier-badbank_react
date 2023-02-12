const express = require("express");
const app = express(); // create express app
const cors = require('cors')
var dal = require('./dal')

app.set("port", process.env.PORT || 3001);

// add middlewares
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(cors())

app.use('/account', function (req, res, next) {
  dal.isConnected()
    .then( () => next() )
    .catch( (err) => res.status(500).send(err))
})

// create user account
app.get('/account/create/:name/:email/:password',  function (req,res) {
  dal.create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

// create user account
app.get('/account/login/:email/:password',  function (req,res) {
  res.send({
    name: req.params.name,
    email: req.params.email,
    password: req.params.password
  })
})

//get all data
app.get('/account/all',  function (req,res) {
  dal.all()
    .then( data => {
      res.send(data)
    })
    .catch( err => {
      res.status(500).send(err)
    })
})

//deposit
app.post('/account/deposit/:email/:amount', function (req, res) {
  res.send({
    email: req.params.email,
    amount: req.params.amount
  })
})

//withdraw
app.post('/account/withdraw/:email/:amount', function (req, res) {
  res.send({
    email: req.params.email,
    amount: req.params.amount
  })
})

//balance
app.post('/account/balance/:email/', function (req, res) {
  res.send({
    email: req.params.email,
    balance: 100
  })
})


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});