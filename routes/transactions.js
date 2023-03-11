var express = require('express');
var router = express.Router();

var authService = require("../services/authService")
var dal = require("../services/dal");

//do new transaction
router.post("/:email/", function (req, res) {
  let op = null;

  if (req.body.amount > 0) {
    op = dal.deposit;
  }
  else {
    op = dal.withDraw;
  }
  op( req.params.email, Number(req.body.amount))
    .then( (data) => {
      res.send({balance: data})
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
});

module.exports = router;