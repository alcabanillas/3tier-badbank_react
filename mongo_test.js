const {MongoClient, ServerApiVersion} = require('mongodb')
const url = 'mongodb://localhost:27017'

//const client = new MongoClient(url, {useUnifiedTopology : true})

const uri = "mongodb+srv://admin:CBybrW2Tz31xB1LX@cluster0.n9mnpx0.mongodb.net/local_library?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function main(){
  await client.connect()
  console.log('Connected successfully to server');

  // Database Name
  const dbName = 'badbank';

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