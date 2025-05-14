import { connectStateResults } from "react-instantsearch-dom";
import { useRouter } from "next/router";
import Link from "next/link";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 1;
  return (
    <div className="flex justify-center w-full">
      {searchResults?.hits.length === 0 && validQuery && (
        // <div className="z-50 absolute">
        // <div className="z-50 fixed mt-[2.3rem] right-0 left-0 mx-auto w-[40rem] bg-[#080B13]
        // text-white border overflow-y-scroll scrollbar-hide max-h-[25rem] rounded-b-lg">
        <div
          className="z-50 relative w-full bg-[#080B13] mt-4
                           text-white overflow-y-scroll scrollbar-hide h-[94vh]"
        >
          <p className="text-base px-6 py-2 text-white cursor-default select-none">
            No Results Found
          </p>
        </div>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        // <div className="z-50 fixed mt-[2.18%] lg:rounded-lg w-1/3 -ml-96 bg-white border">  w-[39.6rem] mr-[39.6rem]
        // <div className="z-50 fixed mt-[2.3rem] lg:rounded-b-lg w-[633px] left-0 right-0 mx-[676px] bg-[#080B13]
        // text-white border overflow-y-scroll scrollbar-hide max-h-[32rem]">
        //   <div className="fixed right-0 left-0 mx-auto w-full bg-[#080B13] text-white rounded-b-lg
        //                   border border-opacity-20 border-white focus:outline-0.5 overflow-y-scroll scrollbar-hide max-h-[31.15rem] z-50 mt-[2.2rem] ">
        <div className="z-50 relative w-full bg-[#080B13] mt-1 text-white overflow-y-hidden scrollbar-hide h-full pb-8">
          <ol className="space-y-2 overflow-y-hidden scrollbar-hide ">
            {searchResults.hits.map((hit) => (
              <Link
                href={"/s/" + encodeURIComponent(hit.ticker.toLowerCase())}
                shallow={false}
                passHref={true}
                key={hit.objectID}
              >
                <li
                  key={hit.objectID}
                  className="hover:cursor-pointer hover:bg-white hover:bg-opacity-5 py-4 px-6 w-full text-base font-medium"
                >
                  <p className="flex relative text-limiter">{hit.ticker}</p>
                  <p className="flex relative text-sm pt-0.5 text-limiter">
                    {hit.name}
                  </p>
                </li>
              </Link>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default connectStateResults(Hits);
