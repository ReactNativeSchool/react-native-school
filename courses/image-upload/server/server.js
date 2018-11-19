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

const upload = multer({ storage: Storage }).array("imgUploader", 3); // Field name and max count

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/api/Upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.end("Something went wrong!");
    }
    return res.end("File uploaded sucessfully!.");
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
