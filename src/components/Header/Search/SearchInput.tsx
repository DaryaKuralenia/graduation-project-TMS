import "./SearchInput.scss";
import React, { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const { valueToFind, setValueToFind, searchOption, setSearchOption } =
    useContext(SearchContext);
  const navigate = useNavigate();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter") {
      e.preventDefault();
      setValueToFind(value);
      value = "";
      navigate("/search-results");
    }
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOption(searchOption === "authors" ? "books" : "authors");
  };

  //нужен хардкод
  return (
    <div className="header-container__search-input">
      <form>
        <select onChange={handleChangeOption}>
          <option value={searchOption}>Author</option>
          <option value={searchOption}>Book</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          defaultValue={valueToFind}
          onKeyDown={onKeyDown}
        />
      </form>
    </div>
  );
};

export default SearchInput;
