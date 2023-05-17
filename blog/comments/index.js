const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommmentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.send(comments);
});

app.post("/events", async (req, res) => {
  console.log("event recived", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentByPostId[postId]; //return a array

    const comment = comments.find((comment) => {
      //return a object(single comment object)
      return comment.id === id;
    });

    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("listening in 4001 ");
});
