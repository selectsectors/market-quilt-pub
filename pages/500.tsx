import Error from "next/error";
import Navbar from "../components/Navbar";
import React from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

export default function Page() {
  const router = useRouter();
  return (
    <div className="">
      <Navbar />
      <div className={"min-h-[94vh]"}>
        <section className="flex items-center h-full lg:p-16 text-white">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto">
            <div className="lg:max-w-lg text-center pt-44">
              <h2 className="mb-4 font-extrabold text-9xl lg:text-[125pt]">
                <span className="sr-only">Error</span>500
              </h2>
              <p className="text-3xl lg:text-5xl font-semibold text-center mx-auto justify-center">
                Server Error
              </p>
              <p className="text-xl pt-6">
                Please refresh the page or return to the home page.
              </p>
              <button
                className="flex w-full lg:w-full text-white text-center justify-center py-3.5 mt-12
                                  lg:mb-0 px-2 bg-white bg-opacity-10 rounded-full backdrop-brightness-125
                                  hover:bg-opacity-20 active:bg-opacity-20 focus:bg-opacity-20
                                  hover:shadow-lg active:shadow-lg focus:shadow-lg mx-auto
                                  hover:outline-none active:outline-none focus:outline-none
                                  lg:hover:shadow-none lg:active:shadow-none lg:focus:shadow-none
                                  active:scale-95 font-medium z-50 text-lg shadow-sm"
                onClick={() => {
                  router.push("/", "/", { shallow: false });
                }}
              >
                Return Home
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
// {/*<button*/}
// {/*  className="flex w-full lg:w-1/2 text-white text-center justify-center py-3.5 mt-8 ml-4*/}
// {/*                    lg:mb-0 px-2 bg-white bg-opacity-10 rounded-full backdrop-brightness-125*/}
// {/*                    hover:bg-opacity-20 active:bg-opacity-20 focus:bg-opacity-20*/}
// {/*                    hover:shadow-lg active:shadow-lg focus:shadow-lg*/}
// {/*                    hover:outline-none active:outline-none focus:outline-none*/}
// {/*                    lg:hover:shadow-none lg:active:shadow-none lg:focus:shadow-none*/}
// {/*                    active:scale-95 font-medium z-50 text-lg shadow-sm "*/}
// {/*  onClick={() => {*/}
// {/*    router.push("/", "/", { shallow: false });*/}
// {/*  }}*/}
// {/*>*/}
// {/*  Return Home*/}
// {/*</button>*/}
//
//
// {/*  <div className="px-4 items-center flex justify-center flex-col-reverse h-screen">*/}
// {/*    <div className="lg:w-1/2">*/}
// {/*      <div className="relative">*/}
// {/*        <div className="flex font-black text-white text-[250pt]">500</div>*/}
// {/*        <div className="absolute">*/}
// {/*          <h1 className="my-2 text-white font-bold text-4xl">*/}
// {/*            Server Error*/}
// {/*          </h1>*/}
// {/*          <p className="my-4 text-white text-xl">*/}
// {/*            Please refresh the page or try a different ticker.*/}
// {/*          </p>*/}
// {/*          <button*/}
// {/*            className="flex w-full lg:w-1/2 text-white text-center justify-center py-3.5 mt-8*/}
// {/*                lg:mb-0 px-2 bg-white bg-opacity-10 rounded-full backdrop-brightness-125*/}
// {/*                hover:bg-opacity-20 active:bg-opacity-20 focus:bg-opacity-20*/}
// {/*                hover:shadow-lg active:shadow-lg focus:shadow-lg*/}
// {/*                hover:outline-none active:outline-none focus:outline-none*/}
// {/*                lg:hover:shadow-none lg:active:shadow-none lg:focus:shadow-none*/}
// {/*                active:scale-95 font-medium z-50 text-lg shadow-sm "*/}
// {/*          >*/}
// {/*            Return Home*/}
// {/*          </button>*/}
// {/*        </div>*/}
// {/*      </div>*/}
// {/*    </div>*/}
// {/*    <div className="hidden lg:block">*/}
// {/*      <img*/}
// {/*        className="hidden lg:block"*/}
// {/*        src="https://i.ibb.co/ck1SGFJ/Group.png"*/}
// {/*      />*/}
// {/*    </div>*/}
// {/*  </div>*/}
