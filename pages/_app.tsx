import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import Router from "next/router";
import React from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const customFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font--var",
  fallback: ["sans-serif"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {loading ? (
        <main className={customFont.className + " bg-[#0E1320]"}>
          <Navbar />
          <div className="relative flex w-full min-h-[94vh] justify-center items-center">
            <Loading />
          </div>
          <Footer />
        </main>
      ) : (
        <main className={customFont.className + " bg-[#0E1320]"}>
          <Script
            defer
            data-domain="marketquilt.com"
            src="https://plausible.io/js/plausible.js"
          />
          <Component {...pageProps} />
          <Analytics />
        </main>
      )}
    </>
  );
  // return (
  // <main className={customFont.className+" bg-[#0E1320]"}>
  //     <Component {...pageProps} />
  // </main>
  // )
}

export default MyApp;
