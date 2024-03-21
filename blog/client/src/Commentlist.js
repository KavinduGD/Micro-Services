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

  const renderedComments = comments.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ));

  return <div>{renderedComments}</div>;
};
