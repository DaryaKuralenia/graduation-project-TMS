import "./SearchResults.scss";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const { valueToFind, searchOption } = useContext(SearchContext);
  const [authorInfo, setAuthorInfo] = useState<IAuthorInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getInfoBySearch = async () => {
    await axios
      .get(
        `https://openlibrary.org/search/${searchOption}.json?q=${valueToFind}`
      )
      .then(({ data }) => {
        setAuthorInfo(data.docs);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    setLoading(true);
    getInfoBySearch();
    setLoading(false);
  }, [valueToFind]);

  interface IAuthorInfo {
    name: string;
    key: string;
    birth_date: string;
    death_date: string;
    top_subjects: Array<string>;
    work_count: number;
  }

  return (
    <div className="search-info-container">
      <p className="search-info-container__search-details">
        Search results for: {valueToFind}. {authorInfo.length} authors found.
      </p>
      {authorInfo
        .sort((a, b) => {
          return b.work_count - a.work_count;
        })
        .map((el) => (
          <div key={el.key} className="search-info-container__author-info">
            <img
              src={`https://covers.openlibrary.org/a/olid/${el.key}-M.jpg`}
              alt={`${el.key} image`}
            />
            <div className="search-info-container__author-description">
              <h3
                className="search-info-container__author-description-name"
                onClick={() => navigate(`/author/${el.key}`)}
              >
                {el?.name}
              </h3>
              {el.birth_date ? (
                <span className="search-info-container__author-description-dates">
                  {el.birth_date} - {el.death_date}
                </span>
              ) : (
                ""
              )}
              <p>
                <span>
                  {el?.work_count === 1
                    ? `${el?.work_count} book`
                    : `${el?.work_count} books`}
                </span>
                <br />
                {el?.top_subjects
                  ? `Top subjects: ${el?.top_subjects.join(", ")}`
                  : ""}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
