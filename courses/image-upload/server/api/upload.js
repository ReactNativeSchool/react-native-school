const Express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = Express();
app.use(bodyParser.json());

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, process.env.NODE_ENV === "production" ? "/tmp" : "../images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: Storage });

app.post("*", upload.array("photo", 3), (req, res) => {
  console.log("file", req.files);
  console.log("body", req.body);
  res.status(200).json({
    message: "success!"
  });
});

app.get("*", (req, res) => {
  res.status(200).send("Hi!");
});

module.exports = app;
