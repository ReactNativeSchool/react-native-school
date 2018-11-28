const Express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = Express();
app.use(bodyParser.json());

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, process.env.NODE_ENV === "production" ? "/tmp" : "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: Storage });

app.get("/", (req, res) => {
  res
    .status(200)
    .send("You can post to /api/upload-single or /api/upload-multiple.");
});

app.post("/api/upload-single", upload.single("photo"), (req, res) => {
  console.log("file", req.file);
  console.log("body", req.body);
  res.status(200).json({
    message: "success!"
  });
});

app.post("/api/upload-multiple", upload.array("photo", 3), (req, res) => {
  console.log("file", req.files);
  console.log("body", req.body);
  res.status(200).json({
    message: "success!"
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
