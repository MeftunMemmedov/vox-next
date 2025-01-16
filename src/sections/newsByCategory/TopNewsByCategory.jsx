import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopNewsByCategory = ({ news }) => {
  const topFirstNews = news[0];

  if(!topFirstNews) return null;
  
  return (
    <section>
      <div className="flex md:flex-row flex-col">
        <div className="relative 2xl:h-[1000px] xl:h-[800px] lg:h-[600px] h-[400px] md:w-3/5 w-full">
          <Image
            src={topFirstNews.main_img}
            fill
            className="z-[-1] object-cover"
          />
          <div className="w-full h-full flex justify-center items-center text-white">
            <div className="text-center p-3 shadow-[0px_0px_43px_32px_rgba(0,0,0,0.65)] top-news-bycategory-text-box">
              <Link
                href={`/${
                  topFirstNews.category.slice(0, 1).toLowerCase() +
                  topFirstNews.category.slice(1)
                }/${topFirstNews.id}/${topFirstNews.title}`}
              >
                <h2 className="lg:text-4xl text-2xl font-semibold">
                  {topFirstNews.title}
                </h2>
              </Link>
              <p className="my-4 italic">By {topFirstNews.written_by}</p>
            </div>
          </div>
        </div>
        <div className="md:w-2/5 w-full">
          {news.slice(1, 3).map((singleNews, index) => (
            <div
              className="2xl:h-[500px] xl:h-[400px] lg:h-[300px] md:h-[200px] sm:h-[400px] h-[300px] relative flex items-end"
              key={index}
            >
              <Image
                src={singleNews.main_img}
                fill
                className="z-[-1] object-cover"
                alt={singleNews.title}
              />
              <div className="w-full px-3 h-4/5 top-news-bycategory-text-box-2 flex flex-col justify-end text-white">
                <Link
                  href={`/${
                    singleNews.category.slice(0, 1).toLowerCase() +
                    singleNews.category.slice(1)
                  }/${singleNews.id}/${singleNews.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <h2 className="font-semibold text-xl mb-2">
                    {singleNews.title}
                  </h2>
                </Link>
                <p className="italic">By {singleNews.written_by}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopNewsByCategory;
