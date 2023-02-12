const { createUser } = require("./authService");

createUser({
  email: "alvaro@gmail.com",
  password: "secret",
  name: "Alvaro",
});
