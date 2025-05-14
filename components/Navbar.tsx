import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NavSearch from "../components/navsearch";
import {
  Bars4Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import MobileSearch from "../components/mobilesearch";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(null);
  const navigationRef = useRef();
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={
        (menuOpen ? "" : "") + "absolute w-full z-50 lg:top-4 overflow-visible"
      }
    >
      <nav
        className={
          (menuOpen ? "" : "h-16") +
          " relative lg:text-white lg:items-center lg:mx-8 lg:rounded-lg z-50 "
        }
      >
        <div className="relative flex lg:items-center h-16 z-50 bg-[#080B13] lg:bg-opacity-100 lg:bg-[#080B13] lg:rounded-lg">
          <div className="relative flex items-center w-full">
            <div className="hover:cursor-pointer px-6 lg:py-4 select-none ">
              <div className="fixed relative my-auto w-fit">
                <a
                  href={"/"}
                  className="text-left lg:text-xl text-lg font-bold items-center text-transparent saturate-200 brightness-110
                             bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500 "
                >
                  Market Quilt
                </a>
              </div>
            </div>
            <div className="hidden lg:block absolute lg:static lg:right-0 lg:left-0 lg:mx-auto z-50">
              {router.pathname !== "/" ? <NavSearch /> : <NavSearch />}
            </div>
            <div className="absolute lg:font-medium justify-end lg:right-4 right-6">
              <div className="relative flex lg:gap-x-4 justify-end ">
                {/*Menu Button Hamburger*/}
                <button
                  type="button"
                  className={
                    menuOpen
                      ? "hidden"
                      : "lg:hidden relative flex text-white transform duration-75 transition-all ease-in"
                  }
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  {/*<Bars4Icon className="block h-7 w-7" aria-hidden="true" />*/}
                  <MagnifyingGlassIcon
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className={
                    !menuOpen
                      ? "hidden"
                      : "lg:hidden relative flex text-white -mr-1 transform duration-75 transition-all ease-in"
                  }
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                </button>
                {/*<button*/}
                {/*  className="hidden lg:flex w-fit my-4 mx-auto text-center justify-center py-1.5 px-4 text-gray-50*/}
                {/*rounded hover:opacity-80 font-medium"*/}
                {/*  onClick={() => router.push("/login")}*/}
                {/*>*/}
                {/*  Log In*/}
                {/*</button>*/}
                {/*<button*/}
                {/*  className="hidden lg:flex w-fit my-4 mx-auto text-center justify-center py-1.5 px-4 text-gray-50 rounded*/}
                {/*  hover:opacity-80 active:scale-95 font-medium"*/}
                {/*  onClick={() => router.push("/signup")}*/}
                {/*>*/}
                {/*  Sign Up*/}
                {/*</button>*/}
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            menuOpen
              ? `lg:hidden w-full bg-[#080B13] min-h-[94vh] duration-150 transition-all ease-in z-50 `
              : `hidden w-full -translate-y-[200vh] bg-[#080B13]  duration-150 transition-all ease-in z-50`
          }
          id="mobile-menu"
        >
          <div className="py-4 w-full">
            <MobileSearch />
          </div>
        </div>
      </nav>
    </div>
  );
}
