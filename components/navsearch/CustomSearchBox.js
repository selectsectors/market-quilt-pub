import { connectSearchBox } from "react-instantsearch-dom";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function SearchBox({ refine }) {
  const router = useRouter();
  const [route, setRoute] = useState();
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (router.pathname === "/s/[[...pid]]") {
      router.push(route.toLowerCase());
    } else {
      router.push("s/" + route.toLowerCase());
    }
    return false;
  };

  const handleInput = (e) => {
    setRoute(e);
    refine(e);
  };
  const validQuery = route?.length >= 1;
  return (
    <div className="fixed relative justify-center">
      <form
        onSubmit={handleSubmit}
        role="search"
        autoComplete="off"
        className="fixed relative w-[40rem] mr-[10.9rem]"
      >
        {/*<a className="absolute ml-3 py-2 lg:py-1.5">&#x1F50D;</a>*/}
        <MagnifyingGlassIcon className="absolute ml-5 py-1.5 w-4 mt-1 text-gray-100" />
        <input
          ref={inputRef}
          id="algolia_search"
          autoComplete="off"
          type="search"
          className={
            (!!validQuery
              ? "rounded-t-lg outline-none"
              : "rounded-lg focus:outline-0.5") +
            "  w-[40rem] py-1.5 pl-12 pr-3 text-[15px] placeholder:text-gray-100 font-base text-white placeholder-white bg-transparent border border-white border-opacity-20"
          }
          placeholder="Search Company or Ticker"
          onChange={(e) => handleInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}

export default connectSearchBox(SearchBox);
