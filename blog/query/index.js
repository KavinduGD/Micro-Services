const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

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

  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("listening on 4002");
});
