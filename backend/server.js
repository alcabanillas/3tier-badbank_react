// env variables
const dotenv = require('dotenv');
dotenv.config()

app = require('./app')

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});