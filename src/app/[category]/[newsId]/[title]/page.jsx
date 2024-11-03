import { newsApi } from "@/redux/newsApi";
import { store } from "@/redux/store";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import Link from "next/link";

const page = async ({ params }) => {
  const { data, isLoading, isError } = await store.dispatch(
    newsApi.endpoints.getNewsById.initiate(params.newsId)
  );
  const currentNews = data[0];
  const year=currentNews.day.slice(0,4)
  const day=currentNews.day.slice(5,7)
  const month=currentNews.day.slice(8)
  console.log(month)
  return (
    <main className="py-12">
      <div className="container m-auto">
        <div className="w-3/4 ">
          <section className="">
            <span className="bg-yellow-400 py-1 px-4 font-semibold">
              {currentNews.category}
            </span>
            <h2 className="my-5 text-3xl font-bold">{currentNews.title}</h2>
            <h5 className="italic text-sm text-gray-400">
              By{" "}
              <Link className="hover:text-black transition duration-400" href={`/authors/${currentNews.written_by}`}>
                {currentNews.written_by}
              </Link>
            </h5>
            <div className="">
              <span>{currentNews.day}</span>
            </div>

            <div className="relative h-[450px] my-3">
              <Image src={currentNews.main_img} fill className="object-cover" />
            </div>
          </section>

          <section>
            <div>{parse(String(currentNews.description))}</div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
