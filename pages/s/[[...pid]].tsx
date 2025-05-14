import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeadComponent from "../../components/HeadComponent";
import Loading from "../../components/Loading";
import DataTable, { createTheme } from "react-data-table-component";
import Image from "next/image";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import chroma from "chroma-js";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// function toTitleCase(str) {
//   return str.replace(/\w\S*/g, function(txt){
//     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//   });
// }

String.prototype.toTitleCase = function () {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  // Certain minor words should be left lowercase unless they are the first or last words in the string
  lowers = [
    "A",
    "An",
    "The",
    "And",
    "But",
    "Or",
    "For",
    "Nor",
    "As",
    "At",
    "By",
    "For",
    "From",
    "In",
    "Into",
    "Near",
    "Of",
    "On",
    "Onto",
    "To",
    "With",
  ];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(
      new RegExp("\\s" + lowers[i] + "\\s", "g"),
      function (txt) {
        return txt.toLowerCase();
      }
    );
  // Certain words such as acronyms should be left uppercase
  uppers = ["Id", "Tv", "Nec"];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(
      new RegExp("\\b" + uppers[i] + "\\b", "g"),
      uppers[i].toUpperCase()
    );
  return str;
};

export default function Home({ finalData, info, current }) {
  const imageRef = React.useRef();
  const router = useRouter();
  const { pid } = router.query;
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [image, setImage] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [Days, setDays] = useState(
    router.query?.days?.split(",").map(function (item) {
      return parseInt(item, 10);
    }) || [1, 2, 3, 4, 5]
  );
  const [filterValue, setFilterValue] = useState(Days);
  const [modalLoading, setModalLoading] = useState(false);
  // const [fontSize, setFontSize] = useState(36);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    router.query?.days?.split(",").map(function (item) {
      if (item == 7) {
        router.push("/s/[...pid]", `/s/${pid}`, { shallow: true });
      }
    });
    if (typeof window !== "undefined") {
      setLoading(false);
    }
    if (info !== "undefined") {
      // setImage('https://logo.clearbit.com/'+info.results.homepage_url);
      // try {
      //   setImage('https://api.kickfire.com/logo?website=' + info.results.homepage_url.slice(8));
      // } catch (e) {
      //   // console.log('No company logo found');
      // }
      // setCurrentPrice((current.ticker.lastQuote.P+current.ticker.lastQuote.p)/2)

      // setCurrentPrice(current.ticker.lastTrade.p); // Needs Live Subscription
      setCurrentPrice(current.ticker.day.l);
    }
    // const handleScroll = () => {
    //   setScrollY(window.scrollY);
    // };
    // handleScroll();
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [info]);

  const filteredData = finalData.filter((x) => Days.indexOf(x.day) !== -1);
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // const f = chroma.scale(["yellow", "red", "black"]);
  // console.log(f(7).hex());

  createTheme(
    "solarized",
    {
      text: {
        primary: "#FFF",
        secondary: "#FFF",
      },
      background: {
        default: "#0E1320",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#0E132000",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      style: {
        backgroundColor: "#080B13",
        fontSize: "16px",
        fontWeight: "600",
        // justifyContent: 'left',
      },
    },
    {
      name: "10:00 AM",
      selector: (row) =>
        row["10:00 AM"] == undefined ? "-" : row["10:00 AM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["10:00 AM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
              borderWidth: "1px",
              borderColor: "#0E1320",
            },
          },
        },
        {
          when: (row) => row["10:00 AM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "10:30 AM",
      selector: (row) =>
        row["10:30 AM"] == undefined ? "-" : row["10:30 AM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["10:30 AM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["10:30 AM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "11:00 AM",
      selector: (row) =>
        row["11:00 AM"] == undefined ? "-" : row["11:00 AM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["11:00 AM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["11:00 AM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "11:30 AM",
      selector: (row) =>
        row["11:30 AM"] == undefined ? "-" : row["11:30 AM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["11:30 AM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["11:30 AM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E211B",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "12:00 PM",
      selector: (row) =>
        row["12:00 PM"] == undefined ? "-" : row["12:00 PM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["12:00 PM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["12:00 PM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "12:30 PM",
      selector: (row) =>
        row["12:30 PM"] == undefined ? "-" : row["12:30 PM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["12:30 PM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["12:30 PM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "1:00 PM",
      selector: (row) =>
        row["1:00 PM"] == undefined ? "-" : row["1:00 PM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["1:00 PM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["1:00 PM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "1:30 PM",
      selector: (row) =>
        row["1:30 PM"] == undefined ? "-" : row["1:30 PM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["1:30 PM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["1:30 PM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "2:00 PM",
      selector: (row) =>
        row["2:00 PM"] == undefined ? "-" : row["2:00 PM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["2:00 PM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["2:00 PM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "2:30 PM",
      selector: (row) =>
        row["2:30 PM"] == undefined ? "-" : row["2:30 PM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["2:30 PM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["2:30 PM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "3:00 PM",
      selector: (row) =>
        row["3:00 PM"] == undefined ? "-" : row["3:00 PM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["3:00 PM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["3:00 PM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "3:30 PM",
      selector: (row) =>
        row["3:30 PM"] == undefined ? "-" : row["3:30 PM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["3:30 PM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["3:30 PM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "4:00 PM",
      selector: (row) =>
        row["4:00 PM"] == undefined ? "-" : row["4:00 PM"] + "%",
      conditionalCellStyles: [
        {
          when: (row) => row["4:00 PM"] < 0,
          style: {
            backgroundColor: "#BF1A47",
            color: "#1E201A",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row["4:00 PM"] >= 0,
          style: {
            backgroundColor: "#30C930",
            color: "#1E2125",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
  ];

  const customStyles = {
    table: {
      style: {
        display: "flex",
        borderCollapse: "collapse",
        borderSpacing: "0px 0px",
        width: "auto",
      },
    },
    rows: {
      style: {
        fontSize: "15px",
        fontWeight: "600",
        border: "0px",
        // minHeight: '56px'
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#080B13",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        paddingLeft: "0px",
        paddingRight: "0px",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        borderWidth: "0.5px",
        borderColor: "#0E1320",
        borderBottomWidth: "0px",
        topBottomWidth: "0px",
        backgroundColor: "#080B13",
        fontWeight: "600",
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.date === "5 Day Avg",
      style: {
        borderBottomColor: "#080B13",
        // borderBottomWidth: '2px',
        borderBottomStyle: "dash",
      },
    },
  ];

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]
  function fontSize(x) {
    return 36 - x * 0.075;
  }
  const truncateText = (str, max = 44) => {
    const array = str.trim();
    const ellipsis = array.length > max ? `... ` : "";
    return array.substring(0, max) + ellipsis;
  };

  function updateStateList(e, value) {
    if (e.target.checked) {
      setFilterValue(filterValue.concat([value]));
    } else {
      setFilterValue(
        filterValue.filter(function (val) {
          return val !== value;
        })
      );
    }
  }

  function updateStateListMobile(e) {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilterValue(values);
  }

  const filterFormSubmit = (e) => {
    e.preventDefault();
    setModalLoading(true);
    if (filterValue.length < 5) {
      router.push(`/s/${pid}?days=${filterValue.toLocaleString()}`, undefined, {
        shallow: false,
      });
    } else {
      router.push(`/s/${pid}`, undefined, { shallow: false });
    }
    setModalLoading(false);
  };

  const resetFormValues = (e) => {
    e.preventDefault();
    setModalLoading(true);
    setDays([1, 2, 3, 4, 5]);
    setFilterValue([1, 2, 3, 4, 5]);
    setModalLoading(false);
  };

  function shareLink() {
    if (navigator.share) {
      navigator
        .share({
          // title: "Market Quilt",
          // text: `Visualize Intraday Seasonality - ${pid
          //   .toString()
          //   .toUpperCase()}`,
          url: `${window.location.href}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Share functionality is not supported by this browser.");
    }
  }

  if (loading)
    return (
      <div className="overflow-x-hidden ">
        <HeadComponent />
        <div className="relative w-full">
          <Navbar />
          <div className="relative flex w-full min-h-[94vh] justify-center items-center">
            <Loading />
          </div>
        </div>
        <Footer />
      </div>
    );
  return (
    <div
      className={
        filterOpen
          ? "overflow-y-hidden overflow-x-hidden max-h-[100vh] "
          : "overflow-x-hidden "
      }
    >
      <HeadComponent />
      <div className="relative ">
        <Navbar />
        <div className="relative flex w-full justify-center items-center">
          {modalOpen ? (
            <div className="absolute w-full h-full justify-center items-center mx-auto z-50 backdrop-brightness-50 ">
              <div
                id="popup-modal"
                className="relative overflow-y-scroll h-full scrollbar-hide w-1/3 mx-auto justify-center items-center"
              >
                <div className="relative p-4 w-full h-fit justify-center items-center mx-auto mt-[35%]">
                  <div className="relative text-white bg-[#080B13] rounded shadow-xl h-full">
                    <button
                      type="button"
                      className="absolute top-2.5 right-4 hover:opacity-80
                      p-2 ml-auto inline-flex items-center"
                      onClick={() => setModalOpen(false)}
                    >
                      <XMarkIcon
                        className={
                          "h-7 bg-white bg-opacity-10 p-1 rounded-full"
                        }
                      />
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="text-left ">
                      <h3 className="text-2xl font-medium border-b-2 border-gray-800 pt-3.5 pb-4 mx-6">
                        Apply Filters
                      </h3>
                      {modalLoading ? (
                        <div className="mx-6">
                          <div className="relative flex py-16 -mt-2 text-left justify-center items-center z-50">
                            <Loading />
                          </div>
                          <div className="relative inline-flex justify-between pt-4 pb-6 w-full  border-t-2 border-gray-800">
                            <button
                              className="text-white bg-white bg-opacity-10 hover:bg-opacity-5 active:scale-95 rounded-lg
                                      text-base font-medium py-2.5 ease-out duration-100 w-1/4"
                              disabled
                            >
                              Reset All
                            </button>
                            <button
                              className="text-white bg-blue-800 hover:bg-opacity-80 active:scale-95 rounded-lg
                                      text-base font-medium py-2.5 ease-out duration-100 w-1/4"
                              disabled
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      ) : (
                        <form
                          className="flex flex-col text-left py-6 px-6"
                          onSubmit={(e) => filterFormSubmit(e)}
                        >
                          <h4 className="text-xl font-medium">Select Days</h4>
                          <div className="inline-flex items-center text-left pt-3 pb-2 justify-between">
                            <div className="inline-flex items-center justify-center">
                              <input
                                className="inline-flex h-4 w-4 mb-0.5 mr-2 text-white border border-gray-300 items-center cursor-pointer rounded-full
                                "
                                type="checkbox"
                                value="1"
                                name="1"
                                id="Monday"
                                checked={filterValue.includes(1)}
                                onChange={(e) => updateStateList(e, 1)}
                              />
                              <label
                                className="inline-flex font-thin text-base form-check-label inline-block hover:cursor-pointer "
                                htmlFor="Monday"
                              >
                                Monday
                              </label>
                            </div>
                            <div className="inline-flex items-center justify-center">
                              <input
                                className="inline-flex h-4 w-4 mb-0.5 mr-2 text-white border border-gray-300 items-center cursor-pointer rounded-full
                          "
                                type="checkbox"
                                value="2"
                                name="2"
                                id="Tuesday"
                                checked={filterValue.includes(2)}
                                onChange={(e) => updateStateList(e, 2)}
                              />
                              <label
                                className="inline-flex font-thin text-base form-check-label inline-block hover:cursor-pointer "
                                htmlFor="Tuesday"
                              >
                                Tuesday
                              </label>
                            </div>
                            <div className="inline-flex items-center justify-center">
                              <input
                                className="inline-flex h-4 w-4 mb-0.5 mr-2 text-white border border-gray-300 items-center cursor-pointer rounded-full
                          "
                                type="checkbox"
                                value="3"
                                name="3"
                                id="Wednesday"
                                checked={filterValue.includes(3)}
                                onChange={(e) => updateStateList(e, 3)}
                              />
                              <label
                                className="inline-flex font-thin text-base form-check-label inline-block hover:cursor-pointer "
                                htmlFor="Wednesday"
                              >
                                Wednesday
                              </label>
                            </div>
                            <div className="inline-flex items-center justify-center">
                              <input
                                className="inline-flex h-4 w-4 mb-0.5 mr-2 text-white border border-gray-300 items-center cursor-pointer rounded-full
                          "
                                type="checkbox"
                                value="4"
                                name="4"
                                id="Thursday"
                                checked={filterValue.includes(4)}
                                onChange={(e) => updateStateList(e, 4)}
                              />
                              <label
                                className="inline-flex font-thin text-base form-check-label inline-block hover:cursor-pointer "
                                htmlFor="Thursday"
                              >
                                Thursday
                              </label>
                            </div>
                            <div className="inline-flex items-center justify-center">
                              <input
                                className="inline-flex h-4 w-4 mb-0.5 mr-2 text-white border border-gray-300 items-center cursor-pointer rounded-full
                          "
                                type="checkbox"
                                name="5"
                                value="5"
                                id="Friday"
                                checked={filterValue.includes(5)}
                                onChange={(e) => updateStateList(e, 5)}
                              />
                              <label
                                className="inline-flex font-thin text-base form-check-label inline-block hover:cursor-pointer "
                                htmlFor="Friday"
                              >
                                Friday
                              </label>
                            </div>
                          </div>
                          <div
                            className={
                              "relative inline-flex justify-between pt-4 w-full mt-6 border-t-2 border-gray-800"
                            }
                          >
                            <button
                              data-modal-toggle="popup-modal"
                              type="button"
                              className="text-white bg-white bg-opacity-10 hover:bg-opacity-5 active:scale-95 rounded-lg
                                    text-base font-medium py-2.5 ease-out duration-100 w-1/4"
                              onClick={(e) => resetFormValues(e)}
                            >
                              Reset All
                            </button>
                            <button
                              data-modal-toggle="popup-modal"
                              type="submit"
                              className="text-white bg-blue-800 hover:bg-opacity-80 active:scale-95 rounded-lg
                                    text-base font-medium py-2.5 ease-out duration-100 w-1/4"
                            >
                              Apply Filters
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="relative flex flex-col w-full items-center pt-16 lg:mx-10 lg:w-full min-h-[100vh]">
            {/*Mobile*/}
            <div
              className="lg:hidden relative flex text-white mr-auto pt-5 items-center border-gray-500 lg:border-b w-full cursor-default
                          px-6 lg:px-0"
            >
              <a className="lg:hidden inline-flex text-3xl font-extralight uppercase pr-2">
                {pid}
              </a>
              <a className="lg:hidden inline-flex text-2xl font-extralight ">
                ${formatter.format(currentPrice)}
                &nbsp;(
                {(current.ticker.todaysChangePerc > 0 ? "+" : "") +
                  current.ticker.todaysChangePerc.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                %)
              </a>
              <button
                className="lg:hidden relative inline-flex justify-right right-0 ml-auto p-1.5 rounded -mr-16
                active:scale-95 transform duration-75 transition-all ease-in "
                onClick={() => {
                  shareLink();
                }}
              >
                <ArrowUpOnSquareIcon className="inline-flex h-[22px] w-[22px] text-white" />
              </button>
              <button
                className="lg:hidden relative inline-flex right-0 ml-auto p-1.5 -mr-1 rounded
                active:scale-95 transform duration-75 transition-all ease-in"
                onClick={() => {
                  toggleFilter();
                }}
              >
                <AdjustmentsHorizontalIcon className="lg:hidden inline-flex h-6 w-6 text-white" />
                {Days.length !== 5 ? (
                  <div
                    className="inline-flex absolute -top-2 -right-2 justify-center items-center w-4 h-4 text-xs font-bold text-white
                    bg-[#BF1A47] shadow-lg rounded-full"
                  >
                    1
                  </div>
                ) : null}
              </button>
            </div>
            <div className="lg:hidden relative text-white items-center mb-4 justify-start w-full px-6">
              <a className={"lg:hidden inline-flex text-3xl py-2 font-bold"}>
                {truncateText(info.results.name)}
              </a>

              {info.results.sic_description ? (
                <a className="lg:hidden flex ml-auto text-sm rounded-lg tracking-wide font-extralight ">
                  {info.results.sic_description.toTitleCase()}
                </a>
              ) : (
                <a className="lg:hidden flex ml-auto text-sm rounded-lg font-medium tracking-wide font-extralight ">
                  {info.results.type}
                </a>
              )}
            </div>

            {/*Desktop*/}
            <div className="hidden lg:relative lg:inline-flex text-white pt-8 pb-4 justify-start items-center border-gray-500 w-full cursor-default">
              <div className={"hidden lg:inline-flex justify-center gap-x-4"}>
                <a
                  style={{ fontSize: fontSize(info.results.name.length) }}
                  className={`hidden lg:inline-flex  font-bold items-center text-left`}
                >
                  {truncateText(info.results.name)}
                </a>
                <a className="hidden lg:inline-flex text-4xl font-extralight uppercase w-fit items-center my-auto">
                  {pid}
                </a>
                <a className="hidden lg:inline-flex text-4xl font-extralight items-center w-fit my-auto">
                  ${formatter.format(currentPrice)}
                  &nbsp;(
                  {(current.ticker.todaysChangePerc > 0 ? "+" : "") +
                    current.ticker.todaysChangePerc.toFixed(2)}
                  %)
                </a>
              </div>
              {info.results.sic_description ? (
                <a className="hidden lg:flex ml-auto py-3 px-5 bg-black bg-opacity-40 rounded-lg tracking-wide">
                  {info.results.sic_description.toTitleCase()}
                </a>
              ) : (
                <a className="hidden lg:flex ml-auto py-3 px-5 bg-black bg-opacity-40 rounded-lg font-medium tracking-wide ">
                  {info.results.type}
                </a>
              )}
              <button
                className="hidden lg:block active:scale-95 transform duration-75 transition-all ease-in bg-black bg-opacity-40 ml-3 p-3 rounded-lg
                            hover:bg-opacity-30 -mr-1"
                onClick={() => {
                  shareLink();
                }}
              >
                <ArrowUpOnSquareIcon className="inline-flex h-[22px] w-[22px] text-white" />
              </button>
              <button
                className="hidden lg:block active:scale-95 transform duration-75 transition-all ease-in bg-black bg-opacity-40 ml-4 p-3 rounded-lg
                            hover:bg-opacity-30 -mr-1"
                onClick={() => {
                  toggleModal();
                }}
              >
                <AdjustmentsHorizontalIcon className="inline-flex h-[22px] w-[22px] text-white" />
                {Days.length !== 5 ? (
                  <div
                    className="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white
                    bg-[#BF1A47] shadow-lg rounded-full"
                  >
                    1
                  </div>
                ) : null}
              </button>
            </div>
            <div className={"w-full rounded"}>
              <DataTable
                columns={columns}
                data={finalData}
                // data={filteredData}
                customStyles={customStyles}
                conditionalRowStyles={conditionalRowStyles}
                theme="solarized"
                responsive
                fixedHeader
                fixedHeaderScrollHeight="92vh"
                className="scrollbar-hide border-none max-w-full mb-6"
              />
            </div>
          </div>
        </div>
        {filterOpen ? (
          <div
            className={`lg:hidden absolute w-full bg-[#080B13] min-h-[94vh] top-16 overflow-y-hidden z-40 fade-in duration-75 transition-all`}
            id="filter-menu"
          >
            <div className="relative inline-flex py-6 px-6 w-full">
              <a
                className={
                  "relative flex text-white text-3xl -mt-1 font-extralight"
                }
              >
                Apply Filters
              </a>
              <button
                className="relative flex right-0 ml-auto p-1.5 -mr-2 rounded focus:bg-opacity-[3.5%] active:scale-95
                 transform duration-75 transition-all ease-in"
                onClick={() => {
                  toggleFilter();
                }}
              >
                <XMarkIcon className="inline-flex h-8 w-8 text-white bg-white bg-opacity-10 rounded-full p-1 -my-2 " />
              </button>
            </div>
            <div className="relative py-6 px-6 w-full">
              {/*<a className={"relative flex text-white text-xl pb-4"}>*/}
              {/*  Select Days*/}
              {/*</a>*/}
              <div className="relative flex w-full">
                <div className="w-full rounded-lg">
                  <form>
                    <label className="relative flex text-white text-xl pb-4">
                      Select Days
                    </label>
                    <select
                      className="relative w-full bg-[#080B13] text-white text-xl font-extralight border-none focus:outline-none rounded-lg bg-gray-100 bg-opacity-10 py-3 px-4
                                  active:bg-opacity-10"
                      // onChange={(e) => {
                      //   setDays(e.target.value);
                      // }}
                      onChange={(e) => {
                        updateStateListMobile(e);
                      }}
                      multiple
                      title="Select Days"
                      defaultValue={filterValue}
                    >
                      <option key="1" value="1">
                        Monday
                      </option>
                      <option key="2" value="2">
                        Tuesday
                      </option>
                      <option key="3" value="3">
                        Wednesday
                      </option>
                      <option key="4" value="4">
                        Thursday
                      </option>
                      <option key="5" value="5">
                        Friday
                      </option>
                    </select>
                    {/*Submit Button*/}
                    <div className="relative flex flex-col justify-center pt-80">
                      <button
                        className="relative flex w-full text-white text-center justify-center py-4
                      px-2 bg-white bg-opacity-10 rounded-full backdrop-brightness-125
                      hover:bg-opacity-20 active:bg-opacity-20 focus:bg-opacity-20
                      hover:shadow-lg active:shadow-lg focus:shadow-lg
                      hover:outline-none active:outline-none focus:outline-none
                      lg:hover:shadow-none lg:active:shadow-none lg:focus:shadow-none
                      focus:scale-95 active:scale-95 font-medium z-50 text-lg shadow-sm"
                        onClick={(e) => {
                          filterFormSubmit(e);
                        }}
                      >
                        <a className="relative flex text-center text-lg">
                          Apply Filters
                        </a>
                      </button>
                      <button
                        className="relative flex w-full text-white text-center justify-center py-2 mt-8 px-2 rounded-full
                      active:scale-95 font-medium z-50 text-lg shadow-sm focus:scale-95 active:scale-95"
                        onClick={(e) => resetFormValues(e)}
                      >
                        <a className="relative flex text-center text-lg font-normal">
                          Reset Filters
                        </a>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=86459"
  );
  async function fetcher(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  const pid = encodeURIComponent(context.query.pid[0]);
  let dayQuery = context.query.days?.split(",") || [1, 2, 3, 4, 5];
  const ts = Date.now();
  const date_ob = new Date(ts);
  const time = `${date_ob.getFullYear()}-${(
    "0" +
    (date_ob.getMonth() + 1)
  ).slice(-2)}-${("0" + date_ob.getDate()).slice(-2)}`;
  const start_date_ts = ts - 3 * 24 * 30 * 60 * 60 * 1000;
  const start_date_ts2 = ts - 6 * 24 * 30 * 60 * 60 * 1000;
  const start_date_ts3 = ts - 9 * 24 * 30 * 60 * 60 * 1000;
  const start_date_ts4 = ts - 10 * 24 * 30 * 60 * 60 * 1000;
  const start_date_ob = new Date(start_date_ts);
  const start_date_ob2 = new Date(start_date_ts2);
  const start_date_ob3 = new Date(start_date_ts3);
  const start_date_ob4 = new Date(start_date_ts4);
  const start_time = `${start_date_ob.getFullYear()}-${(
    "0" +
    (start_date_ob.getMonth() + 1)
  ).slice(-2)}-${("0" + (start_date_ob.getDate() - 1)).slice(-2)}`;
  const start_time2 = `${start_date_ob2.getFullYear()}-${(
    "0" +
    (start_date_ob2.getMonth() + 1)
  ).slice(-2)}-${("0" + (start_date_ob2.getDate() - 1)).slice(-2)}`;
  const start_time3 = `${start_date_ob3.getFullYear()}-${(
    "0" +
    (start_date_ob3.getMonth() + 1)
  ).slice(-2)}-${("0" + (start_date_ob3.getDate() - 1)).slice(-2)}`;
  const start_time4 = `${start_date_ob4.getFullYear()}-${(
    "0" +
    (start_date_ob4.getMonth() + 1)
  ).slice(-2)}-${("0" + (start_date_ob4.getDate() - 1)).slice(-2)}`;
  const dayFilter = dayQuery.map(Number);
  //  Fetch
  const urls = [
    `https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time}/${time}?adjusted=true&sort=desc&limit=50000&apiKey=${
      process.env.POLYGON_API_KEY
    }`,
    `https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time2}/${start_time}?adjusted=true&sort=desc&limit=50000&apiKey=${
      process.env.POLYGON_API_KEY
    }`,
    `https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time3}/${start_time2}?adjusted=true&sort=desc&limit=50000&apiKey=${
      process.env.POLYGON_API_KEY
    }`,
    `https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time4}/${start_time3}?adjusted=true&sort=desc&limit=50000&apiKey=${
      process.env.POLYGON_API_KEY
    }`,
  ];

  const requests = urls.map((url) => fetch(url));
  const data = await Promise.all(requests)
    .then((responses) => {
      const errors = responses.filter((response) => !response.ok);
      if (errors.length > 0) {
        throw errors.map((response) => Error(response.statusText));
      }
      const json = responses.map((response) => response.json());
      return Promise.all(json);
    })
    .then((res) => {
      // data.forEach((datum) => console.error(datum));
      const datax = [];
      res.forEach(function (item) {
        datax.push(item.results);
      });
      return datax.flat();
    })
    .catch((errors) => {
      errors.forEach((error) => console.error(error));
    });
  const [info, current] = await Promise.all([
    fetch(
      `https://api.polygon.io/v3/reference/tickers/${pid.toUpperCase()}?apiKey=${
        process.env.POLYGON_API_KEY
      }`
    ).then((response) => response.json()),
    fetch(
      `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${pid.toUpperCase()}?apiKey=${
        process.env.POLYGON_API_KEY
      }`
    ).then((response) => response.json()),
  ]);
  console.log(data);
  // const info = await fetcher(
  //   `https://api.polygon.io/v3/reference/tickers/${pid.toUpperCase()}?apiKey=${
  //     process.env.POLYGON_API_KEY
  //   }`
  // );
  // const current = await fetcher(
  //   `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${pid.toUpperCase()}?apiKey=${
  //     process.env.POLYGON_API_KEY
  //   }`
  // );

  // const [res1, res2, res3, res4] = await Promise.all([
  //   fetch(urls[0]).then((response) => response.json()),
  //   fetch(urls[1]).then((response) => response.json()),
  //   fetch(urls[2]).then((response) => response.json()),
  //   fetch(urls[3]).then((response) => response.json()),
  // ]);
  // const data = res1.results.concat(res2.results, res3.results, res4.results);

  // OLD WAY
  // const data1 = await fetcher(`https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time}/${time}?adjusted=true&sort=desc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`);
  // const data2 = await fetcher(`https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time2}/${start_time}?adjusted=true&sort=desc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`);
  // const data3 = await fetcher(`https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time3}/${start_time2}?adjusted=true&sort=desc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`);
  // const data4 = await fetcher(`https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time4}/${start_time3}?adjusted=true&sort=desc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`);
  // const data = data1.results.concat(data2.results, data3.results, data4.results);

  //   console.log(
  //     `https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time}/${time}?adjusted=true&sort=desc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}
  //     https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time2}/${start_time}?adjusted=true&sort=desc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}
  //     https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time3}/${start_time2}?adjusted=true&sort=desc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}
  //     https://api.polygon.io/v2/aggs/ticker/${pid.toUpperCase()}/range/30/minute/${start_time4}/${start_time3}?adjusted=true&sort=desc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`
  // )
  // const data = data1.results

  const change = data.map((currVal: object) => ({
    day: new Date(currVal.t + 30 * 60000).getDay(),
    date: new Date(currVal.t + 30 * 60000).toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      day: "2-digit",
      month: "numeric",
      year: "numeric",
    }),
    time: new Date(currVal.t + 30 * 60000).toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
    }),
    [new Date(currVal.t + 30 * 60000).toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
    })]: parseFloat((((currVal.c - currVal.o) / currVal.o) * 100).toFixed(2)),
  }));
  let tSet = [
    "12:00 AM",
    "12:30 AM",
    "1:00 AM",
    "1:30 AM",
    "2:00 AM",
    "2:30 AM",
    "3:00 AM",
    "3:30 AM",
    "4:00 AM",
    "4:30 AM",
    "5:00 AM",
    "5:30 AM",
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    // '10:00 AM', '10:30 AM', '11:00 AM',
    // '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM',
    // '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
  ];

  const changeFilter = change.filter(function (obj: object) {
    return tSet.indexOf(obj.time) === -1;
  });
  // console.log(changeFilter)
  // const dataDates = changeFilter.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index)
  // const dataTimes = (changeFilter.map(item => item.time).filter((value, index, self) => self.indexOf(value) === index))
  // dataTimes.push('Date')
  // dataTimes.reverse()
  const groupByDate = (array) =>
    array.reduce((results, item) => {
      const current = results.find((i) => i.date === item.date);
      if (current) {
        for (let property in item) {
          if (property !== "date") {
            current[property] = item[property];
          }
        }
      } else {
        results.push({ ...item });
      }
      return results;
    }, []);
  const grouped = groupByDate(changeFilter);
  const groupedData = grouped.map(({ time, ...item }) => item);
  groupedData.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);

  const finalData = groupedData.filter((x) => dayFilter.indexOf(x.day) !== -1);
  // console.log(finalData)
  const fiveDayData = finalData.slice(0, 5);
  const tenDayData = finalData.slice(0, 10);
  const twentyDayData = finalData.slice(0, 20);
  const thirtyDayData = finalData.slice(0, 30);
  const fourtyDayData = finalData.slice(0, 40);
  function average(arr) {
    return arr
      .reduce((a, c) => {
        for (let key in c) {
          let line = a.find((x) => x.k === key);
          if (!line) a.push((line = { k: key, sum: 0, nb: 0 }));
          line.sum += c[key];
          ++line.nb;
        }
        return a;
      }, [])
      .reduce((a, c) => {
        a[c.k] = parseFloat((c.sum / c.nb).toFixed(2));
        return a;
      }, {});
  }
  const fiveDayAvg = average(fiveDayData);
  const tenDayAvg = average(tenDayData);
  const twentyDayAvg = average(twentyDayData);
  const thirtyDayAvg = average(thirtyDayData);
  const fourtyDayAvg = average(fourtyDayData);
  fiveDayAvg.date = "5 Day Avg";
  tenDayAvg.date = "10 Day Avg";
  twentyDayAvg.date = "20 Day Avg";
  thirtyDayAvg.date = "30 Day Avg";
  fourtyDayAvg.date = "40 Day Avg";
  finalData.unshift(fiveDayAvg);
  finalData.unshift(tenDayAvg);
  finalData.unshift(twentyDayAvg);
  finalData.unshift(thirtyDayAvg);
  finalData.unshift(fourtyDayAvg);

  return {
    props: { finalData, info, current },
  };
}
