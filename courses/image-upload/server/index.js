const Express = require("express");
const bodyParser = require("body-parser");

const app = Express();
app.use(bodyParser.json());

app.get("*", (req, res) => {
  res.status(200).send("You can post to /api/upload.");
});

module.exports = app;
