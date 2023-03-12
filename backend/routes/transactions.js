var express = require('express');
var router = express.Router();

var authService = require("../services/authService")
var dal = require("../services/dal");

router.use("/:email/", async function(req, res, next) {
  let user = await dal.getUserAccount(req.params.email);
  if (user == null) {
    res.status(404).send("User not found")
  }
  res.locals.user = user
  next()
})

//do new transaction
router.post("/:email/", function (req, res) {
  dal.doNewTransaction( res.locals.user, Number(req.body.amount))
    .then( (data) => {
      res.send({balance: data})
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
});

//do new transaction
router.get("/:email/", function (req, res) {
  dal.getTransactionsByUser(res.locals.user)
    .then( (data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err);
    })
})

module.exports = router;