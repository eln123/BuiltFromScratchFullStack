// The following is in the `start.js` file

// say our sequelize instance is create in 'index.js'
const db = require("./index.js");
// and our server that we already created and used as the previous entry point is 'server.js'
const app = require("../index.js");
const port = process.env.PORT || 3000;

async function sync() {
  await db.sync(); // sync our database
}

sync();
