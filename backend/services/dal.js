const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URL;

const client = new MongoClient(url, { useUnifiedTopology: true });

client
  .connect()
  .then(() => {
    console.log("Connected successfully to DB");
  })
  .catch(() => {
    // Database Name
    console.log("Not connected");
  });

// Database Name
const dbName = "badbank";
let db = client.db(dbName);

// create user account
async function createDBUser(email, name) {
  let user = await db.collection("users").findOne({ email: email });

  if (user != null) {
    return null;
  } else {
    const doc = { email, name, balance: 0 };
    return db.collection("users")
      .insertOne(doc, { w: 1 })
      .then(() => {return doc})
  }
}

async function getBalance(account) {
  let user = await db.collection("users").findOne({ email: account });
  return user ? user.balance : null;
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
  let user = await db.collection("users").findOne({ email: account });
  return user;
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
  createDBUser,
  isConnected,
  getBalance,
  getTransactionsByUser,
  doNewTransaction,
  getUserAccount,
};
