const admin = require("./admin")

function createUser (userInfo) {
  return admin.auth()
    .createUser({
      email: userInfo.email,
      emailVerified: true,
      password: userInfo.password,
      displayName: userInfo.name,
      disabled: false,
    })
};

module.exports = { createUser }
