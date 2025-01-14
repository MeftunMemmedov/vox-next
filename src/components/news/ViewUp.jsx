"use client";
import { updateView } from "@/api/server";
import { useEffect, useState } from "react";

const ViewUp = ({ currentNews, params }) => {
  const [viewedNews, setViewedNews] = useState([]);
  const viewedNewsSession = sessionStorage.getItem("viewedNews")
    ? JSON.parse(sessionStorage.getItem("viewedNews"))
    : [];

  const updateViewCount = async () => {
    const updatedView = {
      views: currentNews.views + 1,
    };

    if (currentNews) {
      updateView(params.newsId,updatedView)
    }
  };
  useEffect(() => {
    setViewedNews([...viewedNews, params.newsId]);
  }, []);

  useEffect(() => {
    if (!viewedNewsSession.includes(params.newsId)) {
      sessionStorage.setItem(
        "viewedNews",
        JSON.stringify([...viewedNewsSession, params.newsId])
      );
      updateViewCount();
    }
  }, [viewedNews]);

  return null;
};

export default ViewUp;
