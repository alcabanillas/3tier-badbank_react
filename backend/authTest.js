// env variables
const dotenv = require('dotenv');
dotenv.config()

const { createUser } = require("./services/authService");

createUser({
  email: "alvaro2@gmail.com",
  password: "secret",
  name: "Alvaro"
}).then( (msg) => console.log(msg))
.catch( (err) => console.error(err))
