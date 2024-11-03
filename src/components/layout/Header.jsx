import Link from "next/link";
import { newsApi } from "@/redux/newsApi";
import { store } from "@/redux/store";
import { IoMdSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

import React from "react";

const styles = {
  main_color: "#fff200",
};

const Header = async () => {
  const { data, isLoading } = await store.dispatch(
    newsApi.endpoints.getAllNews.initiate()
  );
  const allCategories = Array.from(new Set([...data.map((d) => d.category)]));

  return (
    <header className="border-b mb-5 md:bg-white bg-[#fff200]">
      <div className=" h-16 container m-auto flex items-center justify-between">
        <div className="md:w-1/5 w-1/3 h-full flex justify-center items-center">
          <Link href={'/'}>
          <h1 className=" w-32 m-auto text-center md:h-auto h-full flex justify-center items-center md:pt-4 md:pb-8 pb-2.5 md:text-5xl text-4xl bg-[#fff200]">
            Vox
          </h1>
          </Link>
        </div>

        <div className="md:block hidden w-3/5">
          <nav className="flex items-center justify-around font-semibold text-gray-500">
            {allCategories.map((category, index) => (
              <Link
                key={index}
                href={`/${category.toLowerCase()}`}
                className="text-sm"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:w-1/5 w-1/3 flex justify-center items-center">
          <button className="bg-gray-300 py-1 w-full flex justify-center items-center rounded-md text-xl">
            <IoMdSearch />
          </button>
        </div>

        <div className="md:hidden w-1/3 flex justify-center items-center">
          <button className="text-2xl text-gray-500">
            <FaBars />
          </button>
        </div>
      </div>

      <div className="mobile-header"></div>
    </header>
  );
};

export default Header;
