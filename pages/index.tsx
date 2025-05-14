import type { NextPage } from "next";
import HeadComponent from "../components/HeadComponent";
import Navbar from "../components/NavbarIndex";
import Footer from "../components/Footer";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";

const Home: NextPage = () => {
  const [menuOpenMain, setMenuOpen] = useState(false);
  const inputRef = useRef();
  const editItem = () => {
    const searchSelect = document.getElementById(
      "algolia_search"
    )! as HTMLInputElement;
    searchSelect.select();
    setMenuOpen(!menuOpenMain);
  };
  return (
    <div className="overflow-x-hidden top-0">
      <HeadComponent />
      <Navbar menuOpenMain={menuOpenMain} onClick={editItem} />
      <div className="relative flex min-h-full flex-col items-center justify-center lg:bg-none bg-gradient-to-br from-yellow-500 via-pink-500 to-blue-500">
        <main className="relative flex w-fit mx-auto lg:w-full lg:flex-1 lg:flex-col items-center justify-center text-center lg:min-h-[94vh] min-h-[90vh]">
          <div
            id={"hero"}
            className="relative flex flex-col justify-start text-center min-h-full "
          >
            <div className="flex lg:mx-2 mx-6 rounded-2xl ">
              <div className="flex rounded-2xl lg:ml-16 lg:mr-24">
                <div className="relative w-fit my-auto lg:w-[60%] w-full">
                  <h1 className="flex text-left lg:text-justify left-0 lg:pb-4 -mt-2 lg:mt-0 pb-8 text-[40px] leading-10 lg:text-6xl text-white font-black lg:font-bold cursor-default z-50">
                    Visualize Intraday Seasonality
                  </h1>
                  <h2
                    className="flex text-left lg:text-justify font-medium lg:font-light left-0 lg:text-xl text-lg text-white
                               lg:text-white pt-2 pb-16 leading-6 lg:tracking-wider z-50 "
                  >
                    The Market Quilt is a visual representation of intraday
                    seasonality for equities and indices.
                    <br />
                    <br />
                    The Quilt determines whether each half-hour candle was red,
                    green, or flat to reveal directional patterns. Traders often
                    have an anecdotal mental model of this phenomenon (such as
                    focusing on the first and last hour for vanna/charm
                    re-balancing or a variety of momentum indicator setups). The
                    Quilt makes it easy to see these patterns in an unbiased way
                    in order to make informed trading decisions.
                  </h2>
                  <button
                    className="flex w-full lg:w-1/4 text-white text-center justify-center py-3.5
                    -mb-12 lg:mb-0 px-2 bg-white bg-opacity-20 rounded-full backdrop-brightness-125
                    hover:bg-opacity-30 active:bg-opacity-30 focus:bg-opacity-30
                    hover:shadow-lg active:shadow-lg focus:shadow-lg
                    hover:outline-none active:outline-none focus:outline-none
                    lg:hover:shadow-none lg:active:shadow-none lg:focus:shadow-none
                    active:scale-95 font-medium z-50 text-lg shadow-sm "
                    // onClick={() => window.location.href = "/signup"}
                    onClick={() => editItem()}
                  >
                    Search Tickers
                  </button>
                </div>
                <div
                  className="hidden lg:flex ml-60 w-[25vw] h-[25vw] bg-gradient-to-br from-yellow-500 via-pink-500 to-blue-500 rounded-full z-0
                                mt-2 items-center justify-center overflow-x-hidden shadow-[40px_40px_10px_20px_rgba(0,0,0,0.25)]"
                />
                {/*<div className="absolute left-0 right-0 mx-auto my-auto top-0 bottom-0 w-[50vw] h-[50vw] blur-3xl z-0*/}
                {/*bg-gradient-to-br from-yellow-500 via-pink-500 to-blue-500 rounded-full z-0 items-center justify-center overflow-x-hidden shadow-[40px_40px_10px_20px_rgba(0,0,0,0.25)]" />*/}
                {/*  blur-3xl backdrop-blur-3xl mt-32 */}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

// <div className="overflow-x-hidden ">
//   <HeadComponent />
//   <Navbar />
//   <div className="lg:flex min-h-screen flex-col items-center justify-center ">
//     <main className="relative flex w-full flex-1 flex-col items-center justify-center text-center min-h-[50rem]">
//       <div
//         id={"hero"}
//         className="relative flex flex-col justify-start w-full text-center min-h-full "  >
//         <div className="flex mx-8 rounded-2xl">
//           <div className="flex h-[60vh] rounded-2xl justify-center">
//             <div className="relative w-fit justify-center my-auto">
//               <h1 className="flex  text-left  left-0 px-12 pb-4 text-6xl text-gray-100 font-black cursor-default z-50 ">
//                 Visualize Intraday Seasonality
//               </h1>
//               <h2 className="flex text-justify font-light left-0 px-12 text-xl text-gray-100  tracking-wider z-50 w-[61rem]">
//                 The Market Quilt is a visual representation of intraday seasonality for equities and indices.<br/><br/>
//                 The Quilt determines whether each half-hour candle was red, green, or flat to reveal directional patterns.
//                 Traders often have an anecdotal mental model of this phenomenon (such as focusing on the first and last hour
//                 for vanna/charm re-balancing or a variety of momentum indicator setups). The Quilt makes it easy
//                 to see these patterns, unbiased, to make informed trading decisions.
//               </h2>
//               <button className="flex w-1/4 bg-white mt-12 mx-12 text-center justify-center py-3 px-2 text-[#0E1320] rounded
//                   hover:opacity-90 active:scale-95 font-semibold z-50 text-xl"
//                 // onClick={() => window.location.href = "/signup"}
//                       onClick={() => editItem()}
//               >
//                 Search
//               </button>
//             </div>
//             <div className="flex ml-60 w-[25vw] h-[25vw] bg-gradient-to-br from-yellow-500 via-pink-500 to-blue-500 rounded-full z-0
//                               mt-2 items-center justify-center overflow-x-hidden shadow-[40px_40px_10px_20px_rgba(0,0,0,0.25)]" />
//             {/*  blur-3xl backdrop-blur-3xl mt-32 */}
//           </div>
//         </div>
//       </div>
//     </main>
//     <Footer />
//   </div>
// </div>
