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
    <div className="fixed relative justify-center w-full px-4">
      <form
        onSubmit={handleSubmit}
        role="search"
        autoComplete="off"
        className="flex relative w-full  py-2.5 bg-white bg-opacity-10 rounded   "
      >
        {/*<a className="absolute ml-3 py-2 lg:py-1.5">&#x1F50D;</a>*/}
        <MagnifyingGlassIcon className="absolute ml-5 w-4 mt-1 text-white " />
        <input
          ref={inputRef}
          id="algolia_search"
          autoComplete="off"
          type="search"
          className={
            "w-full text-base text-white pl-12 pr-3 placeholder-white bg-transparent outline-none"
          }
          placeholder="Search Company or Ticker"
          onChange={(e) => handleInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}

export default connectSearchBox(SearchBox);
