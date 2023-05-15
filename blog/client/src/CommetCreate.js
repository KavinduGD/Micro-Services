import React, { useState } from "react";
import axios from "axios";
export default function CommetCreate(props) {
  const [commment, setComment] = useState("");

  const commentSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${props.id}/comments`, {
      content: commment,
    });

    setComment("");
  };

  return (
    <div>
      <form onSubmit={commentSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={commment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
