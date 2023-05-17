import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Commentlist(props) {
  // const [comments, setComments] = useState([]);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${props.id}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderComments = props.comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = "sff";
    }
    if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }
    if (comment.status === "rejected") {
      content = "This comment has being rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });
  return (
    <div>
      <ul>{renderComments}</ul>
    </div>
  );
}
