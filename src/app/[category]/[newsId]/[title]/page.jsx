import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { apiUrl, fetchNews, postOptions } from "@/api/news";
import NewsDate from "@/components/news/NewsDate";
import { FaEye } from "react-icons/fa";
import ViewUp from "@/components/news/ViewUp";

const page = async ({ params }) => {
  const data = await fetchNews(`/News2?id=eq.${params.newsId}&select=*`, 10);

  const currentNews = data[0];

  // const updatedView = {
  //   views: currentNews.views + 1,
  // };

  // if (data) {
  //   await axios.patch(
  //     apiUrl + `/News2?id=eq.${params.newsId}`,
  //     updatedView,
  //     postOptions
  //   );
  // }
 

  return (
    <main className="py-12">
      <ViewUp data={data} currentNews={currentNews} params={params}/>
      <div className="container m-auto">
        <div className="lg:w-3/5">
          <section className="w-full">
            <span className="bg-yellow-400 py-1 px-4 font-semibold">
              {currentNews.category}
            </span>
            <h2 className="my-5 text-4xl font-bold">{currentNews.title}</h2>
            <h5 className="italic text-sm text-gray-400">
              By{" "}
              <Link
                className="hover:text-black transition duration-400"
                href={`/authors/${currentNews.written_by}`}
              >
                {currentNews.written_by}
              </Link>
            </h5>
            <div className="flex justify-between items-center">
              <NewsDate currentNews={currentNews} />
              <div className="flex items-center gap-1">
                <FaEye />
                {currentNews.views}
              </div>
            </div>

            <div className="relative xl:h-[450px] lg:h-[500px] md:h-[400px] h-[300px] my-3">
              <Image
                src={currentNews.main_img}
                fill
                className="object-cover "
              />
            </div>
          </section>

          <section>
            <div className="p-3 news-description">
              {parse(String(currentNews.description))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
