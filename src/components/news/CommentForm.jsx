"use client";
import { sendNewComment } from "@/api/server";
import { useEffect, useState } from "react";

const CommentForm = ({ currentNews }) => {
  const date = new Date();

  const [comment, setComment] = useState({
    written_by: "",
    comment: "",
    newsId: currentNews.id,
    date:
      date.getFullYear() +
      "/" +
      (date.getMonth() >= 10 ? date.getMonth() : "0" + date.getMonth()) +
      "/" +
      date.getDate(),
  });

  const handleChange = (e) => {
    setComment((prevCommentState) => ({
      ...prevCommentState,
      [e.target.name]: e.target.value,
    }));
  };

  const getCommentReady = () => {
    setComment((prevCommentState) => ({
      ...prevCommentState,
      newsId: currentNews.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendNewComment(comment);
    window.location.reload()
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className=" flex flex-col gap-3">
        <div className="">
          <input
            type="text"
            name="written_by"
            onChange={handleChange}
            className="border h-12 w-full p-2 outline-0"
            placeholder="Your email"
          />
        </div>
        <div className="">
          <textarea
            name="comment"
            id=""
            onChange={handleChange}
            placeholder="Your comment"
            className="border w-full h-20 outline-0 resize-none"
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CommentForm;
