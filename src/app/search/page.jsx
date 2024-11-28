"use client";
import { fetchNews } from "@/api/news";
import SingleNews from "@/components/news/SingleNews";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = async () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("s");
  const searchRes = await fetchNews("/News2?select=*", 0);
  const results = searchRes.filter(
    (singelNews) =>
      singelNews.title.toLowerCase().includes(q.toLowerCase()) ||
      singelNews.description.toLowerCase().includes(q.toLowerCase())
  );

  if (results.length === 0) return <div>No Results</div>;
  return (
    <section>
      <div className="container m-auto md:w-3/4 w-full my-12">
        {results?.map((singleNews, index) => (
          <SingleNews singleNews={singleNews} key={index} />
        ))}
      </div>
    </section>
  );
};

export default page;
