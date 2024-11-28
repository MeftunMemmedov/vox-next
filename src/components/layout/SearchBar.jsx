"use client";
import { apiUrl, fetchNews } from "@/api/news";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [news, setNews] = useState([]);
  const [blured, setBlured] = useState(true);
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredNewsList = news.filter((singelNews) =>
    singelNews.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    fetchNews("/News2?select=*").then((data) => setNews(data));
  }, []);

  return (
    <>
      <div className="w-full flex justify-end items-center  relative">
        <div
          className={` transition-all duration-500 h-12 flex justify-end  ${
            isSearchBarVisible
              ? "max-w-[800px] "
              : "max-w-0"
          } overflow-hidden`}
        >
          <input
            type="text"
            placeholder="Search for...."
            className="w-[800px] border outline-0 rounded-xl px-5 relative right-[-10px]"
            onChange={handleSearchInputChange}
            onBlur={() => {
              setTimeout(()=>{
                setBlured(true)
              },500)
            }}
            onFocus={() => setBlured(false)}
          />
        </div>
        <button
          className="bg-gray-300 py-1 w-12 h-12 flex justify-center items-center rounded-md text-xl"
          onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
        >
          <IoMdSearch />
        </button>
        {!blured && searchInput !== "" ? (
          <div className="absolute top-12 right-12 z-30 border bg-white w-[800px] h-96 overflow-y-scroll p-2">
            <div>
              <Link href={{
                pathname:"/search",
                query:{
                  s:searchInput
                }
              }}
              className="p-2 border block"
              >Search for {searchInput}</Link>
            </div>
            {filteredNewsList.map((singleNews) => (
              <div className="h-20 border-b flex items-center  mb-2">
                <div className="w-1/6">
                  <img src={singleNews.main_img} alt="" className="w-full" />
                </div>
                <div className="px-1 w-4/5">
                  <Link
                    href={`/${
                      singleNews.category.slice(0, 1).toLowerCase() +
                      singleNews.category.slice(1)
                    }/${singleNews.id}/${singleNews.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {singleNews.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {/*  */}
    </>
  );
};

export default SearchBar;
