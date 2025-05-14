import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import CustomSearchBox from "./CustomSearchBox";
import CustomHits from "./CustomHits";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export default function Search() {
  // function triggerFocus(element) {
  //   let eventType = "onfocusin" in element ? "focusin" : "focus",
  //     bubbles = "onfocusin" in element,
  //     event;
  //   if ("createEvent" in document) {
  //     event = document.createEvent("Event");
  //     event.initEvent(eventType, bubbles, true);
  //   } else if ("Event" in window) {
  //     event = new Event(eventType, { bubbles: bubbles, cancelable: true });
  //   }
  //
  //   element.focus();
  //   element.dispatchEvent(event);
  // }
  // const foo = document.getElementById("foo");
  // triggerFocus(foo);
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="SYMBOLS">
        <div className="relative flex flex-col">
          <div className="flex flex-row z-0 ">
            <CustomSearchBox />
          </div>
          <div className="relative flex flex-row z-50 ">
            <CustomHits className="z-50" />
          </div>
        </div>
      </InstantSearch>
    </>
  );
}
