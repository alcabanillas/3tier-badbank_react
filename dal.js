const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";

const client = new MongoClient(url, { useUnifiedTopology: true });


client.connect().then(() => {
  console.log("Connected successfully to server");
})
.catch(() => {
  // Database Name
  console.log("Not connected")
});

// Database Name
const dbName = "myproject";
let db = client.db(dbName);

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");

    db.collection("users")
      .findOne({ email: email })
      .then((res) => {
        if (res !== null) {
          reject("User already exists");
          return
        }
        console.log('user created')
        const doc = { name, email, password, balance: 0 };
        collection
          .insertOne(doc, { w: 1 })
          .then(resolve(doc))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

function all() {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .find({})
      .toArray()
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      });
  });
}

function isConnected() {
  return new Promise( (resolve, reject) => {
    if (!!client && !!client.topology && client.topology.isConnected()) 
      resolve(true)
    else
      reject('db not connected')    
  })
}


module.exports = { create, all, isConnected};
