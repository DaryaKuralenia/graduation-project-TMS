import React, { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import AuthorsSearchResults from "../../Main/AuthorsSearchResults/AuthorsSearchResults";
import BooksSearchResults from "../../Main/BooksSearchResults/BooksSearchResults";

const SearchResults = () => {
  const { searchOption } = useContext(SearchContext);

  if (searchOption === "authors") {
    return <AuthorsSearchResults />;
  } else {
    return <BooksSearchResults />;
  }
};

export default SearchResults;
