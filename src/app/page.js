import LatestNews from "@/sections/homepage/LatestNews";
import TopStoriesSection from "@/sections/homepage/TopStoriesSection";

export const generateMetadata=()=>{
  return {
    title:"Vox"
  }
}

export default async function Home() {
  
  return (
    <main>
      <TopStoriesSection />
      <LatestNews/>
    </main>
  );
}
