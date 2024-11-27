import Image from "next/image";
import React from "react";
import SingleSideTopStory from "./components/SingleSideTopStory";
import Link from "next/link";
import { apiUrl, fetchNews, getOptions } from "@/api/news";

const TopStoriesSection = async () => {
  const news = await fetchNews("/News2?select=*", 60);
  const slicedNewsForLeft = news.slice(3, 6);
  const slicedNewsForRight = news.slice(6, 9);

  return (
    <section>
      <div className="container m-auto">
        <div
          className="
              relative mb-3
              md:after:content-[''] md:after:bg-yellow-400 after:h-32 after:w-1 after:absolute after:right-0 after:top-4
              md:before:content-[''] md:before:bg-yellow-400 before:h-32 before:w-1 before:absolute before:left-0 before:top-4
            "
        >
          <h2
            className="
                text-center md:text-3xl text-xl relative
                after:content-[''] after:bg-yellow-400 after:w-1/3 after:h-1  after:absolute after:top-4 after:right-0
                before:content-[''] before:bg-yellow-400 before:w-1/3 before:h-1  before:absolute before:top-4 before:left-0
              "
          >
            Top Stories
          </h2>
        </div>

        <div className="flex lg:flex-row gap-y-2 flex-col gap-x-2 md:px-4 px-1">
          <div className="lg:w-3/4 w-full flex md:flex-row flex-col gap-x-2">
            <div className=" lg:w-[33.60%] md:w-1/3 w-full flex flex-col gap-y-2">
              {slicedNewsForLeft.map((singleNews, index) => (
                <SingleSideTopStory
                  news={singleNews}
                  index={index}
                  key={index}
                  slicedNewsConst={slicedNewsForLeft}
                />
              ))}
            </div>
            <div className="lg:w-[66.40%] md:w-3/4 w-full flex flex-col md:order-none order-first">
              <>
                <div className="h-96 relative">
                  <Image src={news[0].main_img} fill className="object-cover" />
                </div>
                <div className="h-54 text-center flex flex-col pb-5">
                  <Link
                    href={`/${
                      news[0].category.slice(0, 1).toLowerCase() +
                      news[0].category.slice(1)
                    }/${news[0].id}/${news[0].title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="md:text-4xl text-3xl font-bold px-3 mb-4"
                  >
                    {news[0].title}
                  </Link>
                  <h6 className="text-xl text-gray-600 italic ">
                    By {news[0].written_by}
                  </h6>
                </div>
              </>

              <hr className="w-11/12 m-auto" />

              <div className="flex h-40 my-3">
                <div className="w-3/5 h-full flex flex-col justify-between text-xl">
                  <Link
                    href={`/${
                      news[1].category.slice(0, 1).toLowerCase() +
                      news[1].category.slice(1)
                    }/${news[1].id}/${news[1].title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="font-semibold"
                  >
                    {news[1].title}
                  </Link>
                  <h6 className="text-sm text-gray-600 italic">
                    By {news[1].written_by}
                  </h6>
                </div>
                <div className="w-2/5 border relative">
                  <Image src={news[1].main_img} fill className="object-cover" />
                </div>
              </div>
              {/* <div className="lg:flex hidden h-40 my-3">
                <div className="w-3/5 h-full flex flex-col justify-between text-2xl">
                  <Link
                    href={`/${
                      news[2].category.slice(0, 1).toLowerCase() +
                      news[2].category.slice(1)
                    }/${news[2].id}/${news[2].title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="font-semibold"
                  >
                    {news[2].title}
                  </Link>
                  <h6 className="text-sm text-gray-600 italic">
                    By {news[2].written_by}
                  </h6>
                </div>
                <div className="w-2/5 border relative">
                  <Image src={news[2].main_img} fill className="object-cover" />
                </div>
              </div> */}
            </div>
          </div>
          <div className="lg:w-1/4 w-full flex lg:flex-col md:flex-row md:gap-x-2 flex-col  gap-y-2">
            {slicedNewsForRight.map((singleNews, index) => (
              <SingleSideTopStory
                news={singleNews}
                index={index}
                key={index}
                slicedNewsConst={slicedNewsForRight}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopStoriesSection;
