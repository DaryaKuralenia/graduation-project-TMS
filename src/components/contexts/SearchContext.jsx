import { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [valueToFind, setValueToFind] = useState("");
  const [searchOption, setSearchOption] = useState("authors");

  const [searchResults, setSearchResults] = useState([]);

  const value = {
    valueToFind,
    setValueToFind,
    searchResults,
    setSearchResults,
    searchOption,
    setSearchOption,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
