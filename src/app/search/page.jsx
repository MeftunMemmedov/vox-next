"use client";
import { fetchData } from "@/api/news";
import SingleNews from "@/components/news/SingleNews";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("s");

  const [isLoading, setIsloading]=useState(true)
  const [searchResults, setSearchResults] = useState([]);
  
  const getResults = async () => {
    const searchRes = await fetchData("/News2?select=*", 0);
    const results = searchRes.filter(
      (singelNews) =>
        singelNews.title.toLowerCase().includes(q.toLowerCase()) ||
        singelNews.description.toLowerCase().includes(q.toLowerCase())
    );

    setSearchResults(results);
    setIsloading(false)
  };

  useEffect(() => {
    getResults();
  }, [q]);

  if(isLoading) return <Loading />
  return (
    <section>
      {searchResults.length !== 0 ? (
        <>
          <div>Results ({searchResults.length})</div>
          <div className="container m-auto md:w-3/4 w-full my-12">
            {searchResults?.map((singleNews, index) => (
              <SingleNews singleNews={singleNews} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div>No resutls</div>
      )}
    </section>
  );
};

export default SearchPage;
