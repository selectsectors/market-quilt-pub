import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <div className="relative flex bottom-0 w-full h-14 justify-center text-gray-100 items-center mt-auto bg-[#080B13] bg-opacity-80 lg:bg-opacity-100 lg:bg-[#080B13]">
      {/*<div className="flex w-full h-full bg-black bg-opacity-40  px-8 rounded-md">*/}
      <div className="lg:hidden flex flex-col justify-center items-center w-full h-full  px-8 text-sm">
        <div className="flex flex-row justify-between items-center w-full h-full">
          <a href={"/#about"} className=" hover:cursor-pointer hover:underline">
            About
          </a>
          <a href="/terms" className=" hover:cursor-pointer hover:underline">
            Terms
          </a>
          <a href="/privacy" className=" hover:cursor-pointer hover:underline">
            Privacy
          </a>
          <span className="hover:underline">
            <a
              href="https://github.com/sponsors/MarketMakerLite"
              target="_blank"
              className="inline-flex items-center tracking-tighter hover:cursor-pointer "
            >
              <HeartIcon className="h-3.5 items-center text-pink-700 pr-2 hover:underline" />{" "}
              Sponsor
            </a>
          </span>
        </div>
      </div>
        <div className="hidden lg:flex w-full h-full">
        <div className="flex justify-between items-center w-full px-12">
        <div className="flex flex-row items-center ">
          <div className="flex flex-row items-center justify-start text-md ">
            <a href={"/"} className="font-medium ">
              © 2022 Market Quilt
            </a>
          </div>
        </div>
        <div className="inline-flex gap-x-20 text-sm ">
          <a href={"/#about"} className=" hover:cursor-pointer hover:underline">
            About
          </a>
          <a href="/terms" className=" hover:cursor-pointer hover:underline">
            Terms
          </a>
          <a href="/privacy" className=" hover:cursor-pointer hover:underline">
            Privacy
          </a>
          <span className="hover:underline">
            <a
              href="https://github.com/sponsors/MarketMakerLite"
              target="_blank"
              className="inline-flex items-center tracking-tighter hover:cursor-pointer "
            >
              <HeartIcon className="h-3.5 items-center text-pink-700 pr-2 hover:underline" />{" "}
              Sponsor
            </a>
          </span>
        </div>
      </div>
    </div>
    </div>
  );
}
