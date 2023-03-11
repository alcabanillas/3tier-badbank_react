const { createUser } = require("./authService");

createUser({
  email: "alvaro2@gmail.com",
  password: "secret",
  name: "Alvaro",
})
