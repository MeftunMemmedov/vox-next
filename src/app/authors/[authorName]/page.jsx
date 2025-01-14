import { fetchData, fetchFilteredData, fetchSingleContent } from "@/api/news";
import SingleNews from "@/components/news/SingleNews";
import Image from "next/image";
import React from "react";

export const generateMetadata = ({ params }) => {
  const authorName = decodeURIComponent(params.authorName);

  return {
    title: `Vox | Authors | ${authorName}`,
  };
};

export const generateStaticParams = async () => {
  const authors = await fetchData("/News-Authors?select=*");
  return authors.map((author) => ({
    authorName: author.name,
  }));
};

const page = async ({ params }) => {
  const { authorName } = params;
  const authorname = decodeURIComponent(authorName);
  const currentAuthor = await fetchSingleContent(`/News-Authors?name=eq.${authorname}`);
  const newsByAuthor = await fetchFilteredData(`/News2?written_by=eq.${authorname}`);

  return (
    <main className="container m-auto">
      <section>
        <div className=" flex py-12">
          <div className="w-1/5 flex justify-center items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                width={1920}
                height={1080}
                className="w-full h-full"
                alt="author profile"
              />
            </div>
          </div>
          <div className="w-4/5">
            <div className="">
              <h2 className="text-4xl font-semibold">{currentAuthor.name}</h2>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-11/12 m-auto">
          {newsByAuthor.map((news, index) => (
            <SingleNews singleNews={news} key={index}/>
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
