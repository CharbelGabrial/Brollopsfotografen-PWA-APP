const express = require("express");

const app = express();

const path = require("path");

const StaticPath = path.join(__dirname, "../public");

app.use(express.static(StaticPath));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/capture", (req, res) => {
  res.render("capture");
});
app.get("/stream", (req, res) => {
  res.render("stream");
});

app.listen(3000, () => {
  console.log("Listening port 3000");
});
