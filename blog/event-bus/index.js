const express = require("express");
const axios = require("axios");
// const cors=require("co")
const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "ok" });
});

app.listen(4005, () => {
  console.log("Listern on Port 4005");
});
