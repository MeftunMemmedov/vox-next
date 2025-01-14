"use server";

import axios from "axios";
import { apiKey, apiUrl, postOptions } from "./news";

export const sendNewComment = async (data) => {
  await axios.post(
    "https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/News-Comments",
    data,
    {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
};

export const updateView = async (newsId, updatedView) => {
  await axios.patch(
    apiUrl + `/News2?id=eq.${newsId}`,
    updatedView,
    postOptions
  );
};

