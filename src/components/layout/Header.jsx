import React from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { fetchData } from "@/api/news";

const styles = {
  main_color: "#fff200",
};

const Header = async () => {
  const data = await fetchData("/News2?select=*", false);

  const allCategories = Array.from(new Set([...data.map((d) => d.category)]));

  return (
    <header className="border-b  md:bg-white bg-[#fff200] relative z-30">
      <div className=" h-16 container m-auto flex items-center justify-between">
        <div className="md:w-1/5 w-1/3 h-full flex justify-center items-center">
          <Link href={"/"}>
            <h1 className=" w-32 m-auto text-center md:h-auto h-full flex justify-center items-center md:pt-12 md:pb-8 pb-2.5 md:text-5xl text-4xl bg-[#fff200]">
              Vox
            </h1>
          </Link>
        </div>

        <div className="md:block hidden w-4/5">
          <nav className="flex items-center justify-around font-semibold text-gray-500">
            {allCategories.map((category, index) => (
              <Link
                key={index}
                href={`/${category.toLowerCase()}`}
                className="text-sm hover:text-black transition duration-500"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>

        

        <div className="md:hidden w-1/3 flex justify-center items-center">
          <button className="text-2xl text-gray-500">
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
