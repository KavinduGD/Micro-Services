const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get();

app.post("/event", (req, res) => {
  const {}
});

app.listen(4002, () => {
  console.log("listening on 4002");
});
