// create your app (application)
const express = require("express");
const app = express();

//logging middleware
const morgan = require("morgan");

app.use(morgan("dev"));

// static middleware

const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));

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

// Other stuff to do:
// - API routes
// - Handle 404 errors (sent 404 status code)
// - Handle 500 errors (sent 500 status code)
