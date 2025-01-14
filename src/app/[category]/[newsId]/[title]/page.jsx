import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { fetchFilteredData, fetchData, fetchSingleContent } from "@/api/news";
import NewsDate from "@/components/news/NewsDate";
import { FaEye } from "react-icons/fa";
import ViewUp from "@/components/news/ViewUp";
import CommentForm from "@/components/news/CommentForm";

export const generateStaticParams = async () => {
  const news = await fetchData("/News2?select=*", false);

  return news.map((singleNews) => ({
    newsId: singleNews.id,
  }));
};

export const generateMetadata = async ({ params }) => {
  const currentNews = await fetchSingleContent(
    `/News2?id=eq.${params.newsId}&select=*`,
    false
  );
  return {
    title: `Vox | ${currentNews.title}`,
  };
};

const page = async ({ params }) => {
  const { newsId } = params;
  const currentNews = await fetchSingleContent(
    `/News2?id=eq.${newsId}&select=*`,
    10
  );

  const comments = await fetchFilteredData(
    `/News-Comments?newsId=eq.${currentNews.id}&select=*`,
    0
  );

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
      <ViewUp currentNews={currentNews} params={params} />
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
                alt={currentNews.title}
              />
            </div>
          </section>

          <section>
            <div className="p-3 news-description">
              {parse(String(currentNews.description))}
            </div>
          </section>
          <section>
            <div>
              <h2 className=" font-semibold font-xl">
                Comments ({comments.length})
              </h2>
              <div className="py-5">
                {comments.map((comment, index) => (
                  <div key={index} className="flex flex-col mb-3">
                    <div className="flex items-center justify-between">
                      <span>By {comment.written_by}</span>
                      <span className="block text-end text-xs text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <div className="bg-gray-300 p-4 md:ml-10 ml-5 mt-2">
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <CommentForm currentNews={currentNews} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
