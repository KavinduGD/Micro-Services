const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommmentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId]; // post eke thani post ekak // returns a object
    const comments = post.comments; //retruns comments array relevent to a postID

    const comment = comments.find((comment) => {
      return comment.id === id; //returns a single comment object
    });

    comment.status = status;
    comment.content = content;
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvents(type, data);
  console.log(posts);
  res.send({});
});

app.listen(4002, async () => {
  console.log("listening on 4002");
  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing event :", event.type);

    handleEvents(event.type, event.data);
  }
});
