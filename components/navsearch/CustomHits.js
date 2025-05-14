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
  // const validQuery = true;
  return (
    <div className="absolute right-0 left-0 mx-auto w-full justify-center z-50">
      {searchResults?.hits.length === 0 && validQuery && (
        // <div className="z-50 absolute">
        <div className="text-white border border-opacity-20 border-white w-[40rem] mr-4 -mt-0.5 bg-[#080B13] rounded-b-lg px-4">
          {/*"flex z-50 fixed right-0 left-0 mx-auto w-[40rem] bg-[#080B13] text-white border border-opacity-20 border-white overflow-y-scroll scrollbar-hide max-h-[25rem] rounded-b-lg">*/}
          <p className="text-base px-2 py-2 text-white cursor-default select-none">
            No Results Found
          </p>
        </div>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        // <div className="z-50 fixed mt-[2.18%] lg:rounded-lg w-1/3 -ml-96 bg-white border">  w-[39.6rem] mr-[39.6rem]
        // <div className="z-50 fixed mt-[2.3rem] lg:rounded-b-lg w-[633px] left-0 right-0 mx-[676px] bg-[#080B13]
        // text-white border overflow-y-scroll scrollbar-hide max-h-[32rem]">
        <div className="text-white border border-opacity-20 border-white w-[40rem] mr-4 -mt-0.5 bg-[#080B13] rounded-b-lg max-h-[43rem] overflow-y-scroll scrollbar-hide">
          <ol className="space-y-2">
            {searchResults.hits.map((hit) => (
              <Link
                href={"/s/" + encodeURIComponent(hit.ticker.toLowerCase())}
                shallow={false}
                passHref={true}
                key={hit.objectID}
              >
                <li
                  key={hit.objectID}
                  className="hover:cursor-pointer hover:bg-[#0E1320] dark:hover:bg-opacity-10 w-full text-base py-2 px-6 font-medium"
                >
                  <p className="hidden lg:flex relative text-limiter">
                    {hit.ticker}
                  </p>
                  <p className="hidden lg:flex relative text-sm pt-0.5 text-limiter">
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
