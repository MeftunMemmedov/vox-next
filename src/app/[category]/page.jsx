import { fetchData } from "@/api/news";
import SingleNews from "@/components/news/SingleNews";
import CategoryDescription from "@/sections/newsByCategory/components/CategoryDescription";
import TopNewsByCategory from "@/sections/newsByCategory/TopNewsByCategory";
import React from "react";
import NotFound from "../not-found";

export const generateStaticParams = async () => {
  const news = await fetchData(`/News2?select=*`, false);
  return news.map((news) => ({
    category: news.category,
  }));
};

export const generateMetadata = async ({ params }) => {
  const categoryName = `${params.category[0].toUpperCase()}${params.category.slice(
    1
  )}`;
  return {
    title: `Vox | ${categoryName} News`,
  };
};

const page = async ({ params }) => {
  const { category } = params;
  const decodedCategoryName = decodeURI(
    `${category[0].toUpperCase()}${category.slice(1)}`
  );

  const categoryNAME =
    decodedCategoryName.split(" ").length === 2
      ? decodedCategoryName
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")
          .toString()
      : decodedCategoryName;

  const newsByCategory = await fetchData(
    `/News2?or=(category.eq.${categoryNAME},tags.cs.{${categoryNAME}})&select=*`,
    60
  );
  if (!newsByCategory.length === 0) return <NotFound />;

  return (
    <main>
      <div className="text-center pt-4 lg:px-80">
        <h2 className="text-4xl font-semibold italic">{categoryNAME}</h2>
        <CategoryDescription categoryName={categoryNAME} />
      </div>
      <hr className="border-2 border-yellow-400 w-11/12 m-auto my-5" />
      <TopNewsByCategory news={newsByCategory} />
      <section>
        <div className="container m-auto md:w-3/4 w-full my-12">
          {newsByCategory.slice(3).map((singleNews, index) => (
            <SingleNews singleNews={singleNews} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
