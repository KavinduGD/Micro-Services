import { useState, useEffect } from "react";
import axios from "axios";

export default ({ comments }) => {
  // const [comments, setComments] = useState([]);

  // const fetchCommnet = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchCommnet();
  // }, []);

  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status == "pending") {
      content = "Comment is pending";
    }
    if (comment.status == "approved") {
      content = comment.content;
    }
    if (comment.status == "rejected") {
      content = "Comment has been rejected";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <div>{renderedComments}</div>;
};
