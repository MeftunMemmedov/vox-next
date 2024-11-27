import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleSideTopStory = ({news, index, slicedNewsConst}) => {
  return (
    <>
      <div className="" >
        <div className="xl:h-56 md:h-32 lg:w-full md:w-[245px] w-full h-72 relative">
          <Image src={news.main_img} fill className="object-cover" />
        </div>
        <div className="h-24 flex flex-col justify-between">
          <Link href={`${news.category.slice(0,1).toLowerCase()+news.category.slice(1)}/${news.id}/${news.title.toLowerCase().replace(/\s+/g, '-')}`} className="font-semibold">{news.title}</Link>
          <h6 className="text-sm text-gray-600 italic">
            By {news.written_by}
          </h6>
        </div>
      </div>
      {index != slicedNewsConst.length - 1 ? <hr className="my-1 md:block hidden" /> : ""}
    </>
  );
};

export default SingleSideTopStory;
