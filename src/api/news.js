import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;
export const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const postOptions={
  headers: {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    "Content-Type":"application/json"
  }
}

export const fetchNews = async (params, revalidateTime) => {
  const response = await fetch(apiUrl + params, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: revalidateTime},
  }).then((res) => res.json());
  return response;
};

export const fetchSingleContent = async (params, revalidateTime) => {
  const response = await fetch(apiUrl + params, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: revalidateTime},
  }).then((res) => res.json());
  return response[0];
};

export const updateViewCount = async (newsId, viewCount) => {
  const data = {
    views: viewCount + 1,
  };
  await axios.patch(apiUrl+`/News2?id=eq.${newsId}`, data, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
};
