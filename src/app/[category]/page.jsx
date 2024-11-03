import SingleNews from "@/components/news/SingleNews";
import { newsApi } from "@/redux/newsApi";
import { store } from "@/redux/store";
import CategoryDescription from "@/sections/newsByCategory/components/CategoryDescription";
import TopNewsByCategory from "@/sections/newsByCategory/TopNewsByCategory";
import React from "react";

const page = async ({ params }) => {
  const categoryName = `${params.category[0].toUpperCase()}${params.category.slice(
    1
  )}`;
  const {
    data: newsByCategory,
    isLoading,
    isError,
  } = await store.dispatch(
    newsApi.endpoints.getNewsByCategory.initiate(categoryName)
  );

  if (isLoading) return <div>Loading....</div>;

  return (
    <main>
      <div className="text-center pt-4 lg:px-80">
        <h2 className="text-4xl font-semibold italic">{categoryName}</h2>
        <CategoryDescription categoryName={categoryName} />
      </div>
      <hr className="border-2 border-yellow-400 w-11/12 m-auto my-5" />

      <TopNewsByCategory news={newsByCategory} category={categoryName} />
      <section>
        <div className="container m-auto my-12">
          {newsByCategory.slice(3).map((singleNews, index) => (
            <SingleNews singleNews={singleNews} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
