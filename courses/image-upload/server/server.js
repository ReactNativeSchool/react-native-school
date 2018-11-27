const Express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = Express();
app.use(bodyParser.json());

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: Storage });

app.post("/api/upload-single", upload.single("photo"), (req, res) => {
  console.log("file", req.file);
  console.log("body", req.body);
  res.status(200).send({
    message: "success!"
  });
});

app.post("/api/upload-multiple", upload.array("photo", 3), (req, res) => {
  console.log("file", req.files);
  console.log("body", req.body);
  res.status(200).send({
    message: "success!"
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
