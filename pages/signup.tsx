import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const Signup = () => {
  return (
    <div className="min-h-screen my-auto">
      <Navbar />
      <div className="flex flex-col justify-center items-center my-auto h-[94vh] pb-32 px-14 text-center">
        <Image
          src="/mq_logo.svg"
          alt="Workflow"
          width={100}
          height={100}
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-300">
          Sign up for an account
        </h2>
        <div className="mt-8 w-80">
          <form action="#" method="POST" className="">
            <div className="shadow-sm space-y-2">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  maxLength={100}
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2
                  placeholder-gray-400 text-gray-300 rounded bg-[#080B13] "
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  maxLength={100}
                  minLength={8}
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2
                  placeholder-gray-400 text-gray-300 rounded bg-[#080B13] "
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  maxLength={100}
                  minLength={8}
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2
                  placeholder-gray-400 text-gray-300 rounded bg-[#080B13] "
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="mt-6 w-full">
              <button
                formAction="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded
             bg-blue-200 text-[#080B13] hover:bg-opacity-90 active:scale-95"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4 font-medium">
          <p className="py-6 text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Log in
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
