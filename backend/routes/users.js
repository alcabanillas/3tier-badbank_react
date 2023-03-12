var express = require('express');
var router = express.Router();

var authService = require("../services/authService")
var dal = require("../services/dal");

// create user account
router.post("/", function (req, res) {
  console.log(req.body)
  authService
    .createUser( { password: req.body.password, email: req.body.email, name: req.body.name })
    .then( (info) => {
      console.log(info.email, info.displayName)
      dal.create(info.email, info.displayName)
        .then( user => res.send(user))
        .catch( (err) => res.status(500).send(err))
      }
    )
    .catch((err) => res.status(500).send(err));
});


// get balance
router.get("/:email/balance/", authService.verifyToken ,function (req, res) {
  console.log(req.params.email)
  dal
    .getBalance(req.params.email)
    .then((data) => {
      res.send({balance : data});
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
