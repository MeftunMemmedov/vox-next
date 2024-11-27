import { newsApi } from "@/redux/newsApi";
import { store } from "@/redux/store";
import LatestNews from "@/sections/homepage/LatestNews";
import TopStoriesSection from "@/sections/homepage/TopStoriesSection";


export default async function Home() {
  
  return (
    <main>
      <TopStoriesSection />
      <LatestNews/>
    </main>
  );
}
