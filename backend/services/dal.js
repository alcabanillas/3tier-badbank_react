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
function createUser(email, name) {
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

async function getTransactionsByUser(user) {
  try {
    let data = await db
      .collection("transactions")
      .find({ account: user.email })
      .project({ account: 0, _id: 0 })
      .toArray();
    return data;
  } catch (err) {
    throw err;
  }
}

function isConnected() {
  return new Promise((resolve, reject) => {
    if (!!client && !!client.topology && client.topology.isConnected())
      resolve(true);
    else reject("db not connected");
  });
}

async function getUserAccount(account) {
  try {
    let user = await db.collection("users").findOne({ email: account });
    return user;
  } catch (err) {
    return null;
  }
}

async function doNewTransaction(user, amount) {
  try {
    const doc = { account: user.email, date: Date.now(), amount };

    await db.collection("transactions").insertOne(doc, { w: 1 });
    user.balance += amount;
    await db
      .collection("users")
      .updateOne({ email: user.email }, { $set: { balance: user.balance } });
    return user.balance;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  isConnected,
  getBalance,
  getTransactionsByUser,
  doNewTransaction,
  getUserAccount,
};
