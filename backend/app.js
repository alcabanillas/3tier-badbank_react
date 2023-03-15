const express = require("express");
const app = express(); // create express app

const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

const swaggerOptions = {
  swaggerDefinition : {
    info : {
      version: "1.0.0",
      title: "Bad Bank API",
      description: "API for Full Stack Bad Bank project",
      contact: {
        name: "Alvaro Cabanillas",
      }
    }
  },
  basePath: "/",
  apis: ["./routes/users.js", "./routes/transactions.js"]
  
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// add cors support
const cors = require("cors");

app.use(cors());

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

// Add a health check route in express
app.get('/health', (req, res) => {
  dal.isConnected()
  .then(() => res.status(200).send('ok'))
  .catch((err) => res.status(500).send(err))
  
})

module.exports = app;