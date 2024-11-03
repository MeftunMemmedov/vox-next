import React from "react";
import Image from "next/image";
import Link from "next/link";

const SingleNews = ({ singleNews }) => {
  return (
    <div className="border-t flex md:h-40 sm:h-28 h-20 my-5">
      <div className="md:w-1/4 w-1/3  relative ">
        <Image src={singleNews.main_img} fill className="object-cover" />
      </div>
      <div className="w-3/5 pl-2">
        <Link
          href={`/${
            singleNews.category.slice(0, 1).toLowerCase() +
            singleNews.category.slice(1)
          }/${singleNews.id}/${singleNews.title
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          className="md:text-lg sm:text-base text-[10px] font-semibold"
        >
          {singleNews.title}
        </Link>
        <p className="md:text-sm text-[8px] font-semibold text-gray-600 my-3">
          By {singleNews.written_by} | {singleNews.time}
        </p>
      </div>
    </div>
  );
};

export default SingleNews;
