var express = require("express");
var router = express.Router();

var authService = require("../services/authService");
var dal = require("../services/dal");

router.use( "/:email/", authService.verifyToken, async function (req, res, next) {
  try {
    let user = await dal.getUserAccount(req.params.email);
    
    if (user == null) {
      res.status(404).send("User not found");
      return;
    }
    
    res.locals.user = user;
    next();
  } catch (err) {
      res.status(500).send("DB Error");
  }
});

/**
 * @swagger
 *  definitions:
 *    Transaction:
 *      type: object
 *      properties:
 *        amount:
 *          type: number
 *    ArrayOfTransactions:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          amount:
 *            type: number
 *          date:
 *            type: string
 */

//do new transaction
/**
 * @swagger
 *  /transactions/{email}:
 *    post:
 *      summary: Create a new transaction
 *      tags:
 *        - transactions
 *      description: Create a new transactions for the user
 *      parameters:
 *        - in: path
 *          description: User account
 *          name: email
 *        - in: body
 *          description: Transaction details
 *          name: Details
 *          schema:
 *            $ref: '#/definitions/Transaction'
 *      responses:
 *        201:
 *          description: Created!
 */
router.post("/:email/", authService.verifyToken, function (req, res) {
  if (isNaN(req.body.amount)) {
    res.status(400).send("Bad request");
    return;
  }

  dal
    .doNewTransaction(res.locals.user, Number(req.body.amount))
    .then((data) => {
      res.send({ balance: data });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/**
 * @swagger
 *  /transactions/{email}:
 *    get:
 *      summary: Get all transactions
 *      tags:
 *        - transactions
 *      description: Get all transactions from the user
 *      parameters:
 *        - in: path
 *          description: User account
 *          name: email
 *      responses:
 *        200:
 *          description: List of all the transactions done for the user
 *          schema:
 *            $ref: '#/definitions/ArrayOfTransactions'
 */
router.get("/:email/", authService.verifyToken, function (req, res) {
  dal
    .getTransactionsByUser(res.locals.user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
