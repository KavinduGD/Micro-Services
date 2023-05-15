const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhos:4000/events", event);
  axios.post("http://localhos:4001/events", event);
  axios.post("http://localhos:40002/events", event);

  res.send({ status: "Ok" });
});

app.listen(4005, () => {
  console.log("listening on 4005 ");
});
