var express = require("express");
var router = express.Router();

var authService = require("../services/authService");
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
 *
 *  UserData:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        example: John Doe
 *      email:
 *        type: string
 *        example: johndoe@mit.edu
 *      balance:
 *        type: number
 *        example: 30.45
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
router.post("/", async function (req, res) {
  if (req.body.provider == "email") {
    await authService.createUser({
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
    });
  }

  try {
    let user = await dal.createDBUser(req.body.email, req.body.name);

    user
      ? res.status(201).send(user)
      : res.status(500).send("User already exists");
  } catch (err) {
    console.log(`DB Error: ${err}`);
    res.status(500).send("DB Error");
  }
});

//filter requests with e-mail.
router.use(
  "/:email/",  
  async function (req, res, next) {
    if (req.method == 'POST') {
      return next()
    }

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
  }
);

// Check if user exists
/**
 * @swagger
 *  /users/{email}/:
 *    get:
 *      summary: Get user info
 *      tags:
 *        - users
 *      description: Check if the user account is available to be created in the system
 *      parameters:
 *        - in: path
 *          description: Email to be checked
 *          name: email
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            $ref: '#/definitions/UserData'
 */
router.get("/:email/", async function (req, res) {
  try {
    let user = await dal.getUserAccount(req.params.email);

    if (user == null) {
      res.status(404).send("User not found");
      return;
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("DB Error");
  }
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
router.get(
  "/:email/balance/",
  authService.verifyToken,
  async function (req, res) {
    try {
      let balance = await dal.getBalance(req.params.email);

      balance >= 0 ? res.send({ balance }) : res.status(404).send();
    } catch (err) {
      res.status(500).send("DB Error");
    }
  }
);

module.exports = router;
