// create your app (application)
const express = require("express");
const app = express();

//logging middleware
const morgan = require("morgan");

app.use(morgan("dev"));

// static middleware

const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));
// bug: syntax error '<' in bundle.js
// solution: make sure it's serving the public folder, not just ../public/index.html

// parsing middleware

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//start the server
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

// sent an index html
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const User = require("./db/Models/index.js");

app.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

app.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

app.get("/auth/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;

// Other stuff to do:
// - API routes
// - Handle 404 errors (sent 404 status code)
// - Handle 500 errors (sent 500 status code)
