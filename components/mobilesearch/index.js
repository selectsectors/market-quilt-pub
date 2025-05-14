import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch } from 'react-instantsearch-dom';
import CustomSearchBox from './CustomSearchBox';
import CustomHits from './CustomHits';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export default function Search() {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="SYMBOLS">
        <div className='relative flex flex-col'>
        <div className="flex w-full ">
          <CustomSearchBox />
        </div>
        <div className="relative flex flex-col">
          <CustomHits className="z-50" />
        </div>
        </div>
      </InstantSearch>
    </>
  );
}
