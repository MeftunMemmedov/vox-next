import { fetchNews } from "@/api/news";
import SingleNews from "@/components/news/SingleNews";
import CategoryDescription from "@/sections/newsByCategory/components/CategoryDescription";
import TopNewsByCategory from "@/sections/newsByCategory/TopNewsByCategory";
import React from "react";

export const generateStaticParams = async () => {
  const news = await fetchNews(`/News2?select=*`, false);
  
  return news.map((news) => ({
    category: news.category,
  }));
};

export const generateMetadata = async({params})=>{
  const categoryName = `${params.category[0].toUpperCase()}${params.category.slice(1)}`;
  return {
    title:`Vox | ${categoryName} News`
  }

}

const page = async ({ params }) => {
  const { category } = params;
  const categoryName = `${category[0].toUpperCase()}${category.slice(1)}`;

  const newsByCategory = await fetchNews(
    `/News2?or=(category.eq.${categoryName},tags.cs.{${categoryName}})&select=*`,
    60
  );

  return (
    <main>
      <div className="text-center pt-4 lg:px-80">
        <h2 className="text-4xl font-semibold italic">{categoryName}</h2>
        <CategoryDescription categoryName={categoryName} />
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
