const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URL;

const client = new MongoClient(url, { useUnifiedTopology: true });

client
  .connect()
  .then(() => {
    console.log("Connected successfully to server");
  })
  .catch(() => {
    // Database Name
    console.log("Not connected");
  });

// Database Name
const dbName = "badbank";
let db = client.db(dbName);

// create user account
function create(email, name) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");

    db.collection("users")
      .findOne({ email: email })
      .then((res) => {
        if (res !== null) {
          reject("User already exists");
          return;
        }
        const doc = { email, name, balance: 0 };
        collection
          .insertOne(doc, { w: 1 })
          .then(resolve(doc))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

function getBalance(user) {
  console.log(user)
  return new Promise((resolve, reject) => {
    db.collection("users")
      .findOne({ email: user })
      .then((res) => {
        if (res != null) {
          resolve(res.balance);
          return;
        } else {
          reject("User not found");
        }
      });
  });
}

function all() {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .find({})
      .toArray()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function isConnected() {
  return new Promise((resolve, reject) => {
    if (!!client && !!client.topology && client.topology.isConnected())
      resolve(true);
    else reject("db not connected");
  });
}

function deposit(user, amount) {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .findOne({ email: user })
      .then((res) => {
        if (res != null) {
          console.log(res)
          resolve(amount);
          return;
        } else {
          reject("User not found");
        }
      });
  });
}

function withDraw(user, amount) {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .findOne({ email: user })
      .then((res) => {
        if (res != null) {
          resolve(amount);
          return;
        } else {
          reject("User not found");
        }
      });
  });
}

module.exports = { create, all, isConnected, getBalance, deposit, withDraw };
