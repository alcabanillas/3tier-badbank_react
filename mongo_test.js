const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const client = new MongoClient(url, {useUnifiedTopology : true})


async function main(){
  await client.connect()
  console.log('Connected successfully to server');

  // Database Name
  const dbName = 'myproject';

  const db = client.db(dbName);

  //new user
  var name = 'user' + Math.floor(Math.random() * 10000)
  var email = name + '@mit.edu'

  //insert into customer table
  const collection = db.collection('users');

  var doc = {name, email}

  try {
    await collection.insertOne(doc, {w:1})
  }
  catch (error) {
    console.log(`Error inserting data: ${error}`)
  }

  let alvaroemail = 'alvaro@gmail.com'
  const findResult = await db.collection('users').findOne({ "email" : alvaroemail})
    .then( (res) => console.log('Found documents => ', res !== null))
  


  // the following code examples can be pasted here...
  return 'done.';  
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());