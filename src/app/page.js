import { newsApi } from "@/redux/newsApi";
import { store } from "@/redux/store";
import LatestNews from "@/sections/homepage/LatestNews";
import TopStoriesSection from "@/sections/homepage/TopStoriesSection";

export default async function Home() {
  const {
    data: allNews,
    isLoading: allNewsLoading,
    isError:allNewsError,
  } = await store.dispatch(newsApi.endpoints.getAllNews.initiate());

  return (
    <main>
      <TopStoriesSection news={allNews}/>
      <LatestNews news={allNews}/>
    </main>
  );
}
