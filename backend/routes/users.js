var express = require('express');
var router = express.Router();

var authService = require("../services/authService")
var dal = require("../services/dal");

/**
 * @swagger
 * definitions:
 *  UserInfo:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        example: John Doe
 *      email:
 *        type: string
 *        example: johndoe@mit.edu
 *      password:
 *        type: string
 *        example: secret123
 *  UserBalance:
 *    type: object
 *    properties:
 *      amount:
 *        type: number
 *        example: 23
 */

/**
 * @swagger
 *  /users:
 *    post: 
 *      summary: Create user
 *      tags:
 *        - users
 *      description: Creates a new user account
 *      parameters:
 *        - in: body
 *          description: User info
 *          name: UserInfo
 *          schema:
 *            $ref: '#/definitions/UserInfo'
 *      responses: 
 *        201: 
 *          description: Created!
 */
router.post("/", function (req, res) {
  // Comprobar si el proveedor es google o email. En caso de que sea google, dar de alta en BBDD directamente.
  authService
    .createUser( { password: req.body.password, email: req.body.email, name: req.body.name })
    .then( (info) => {
      dal.createUser(info.email, info.displayName)
        .then( user => res.status(201).send(user))
        .catch( (err) => res.status(500).send(err))
      }
    )
    .catch((err) => res.status(500).send(err));
});

//filter requests with e-mail.
router.use("/:email/", authService.verifyToken, async function (req, res, next) {
  let user = await dal.getUserAccount(req.params.email);
  if (user == null) {
    res.status(404).send("User not found");
    return;
  }
  res.locals.user = user;
  next();
});

// get current balance
/**
 * @swagger
 *  /users/{email}/balance:
 *    get: 
 *      summary: Get balance
 *      tags:
 *        - users
 *      description: Gets current balance from the requested user
 *      parameters:
 *        - in: path
 *          description: User account
 *          name: email
 *      responses: 
 *        200: 
 *          description: User balance
 *          schema:
 *            $ref: '#/definitions/UserBalance'
 */
router.get("/:email/balance/", authService.verifyToken, function (req, res) {
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
