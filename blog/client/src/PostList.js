import React, { useState, useEffect } from "react";
import axios from "axios";
import CommetCreate from "./CommetCreate";
import Commentlist from "./Commentlist";

export default function PostList() {
  const [post, setPost] = useState({});
  //console.log(post);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPost(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPosts = Object.values(post).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <Commentlist comments={post.comments} />
          <CommetCreate id={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
}
