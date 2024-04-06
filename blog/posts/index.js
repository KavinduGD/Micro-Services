const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  console.log("getting posts");
  res.status(200).send(posts);
});

app.post("/posts", async (req, res) => {
  console.log("creating posts");
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
  } catch (err) {
    console.log(err);
  }

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("event recieved", req.body.type);

  res.status(200).send({});
});

app.listen(4000, () => {
  console.log("This is version 2");
  console.log("Listern on Port 4000");
});
