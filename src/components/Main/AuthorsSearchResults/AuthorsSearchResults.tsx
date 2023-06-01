import "./AuthorsSearchResults.scss";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { BASE_URL } from "../../URL";

interface IAuthorInfo {
  name: string;
  key: string;
  birth_date: string;
  death_date: string;
  top_subjects: Array<string>;
  work_count: number;
}

const AuthorsSearchResults = () => {
  const { valueToFind, searchOption } = useContext(SearchContext);
  const [authorInfo, setAuthorInfo] = useState<IAuthorInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getInfoBySearch = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/search/${searchOption}.json?q=${valueToFind}`)
      .then(({ data }) => {
        setAuthorInfo(data.docs);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getInfoBySearch();
  }, [valueToFind]);

  if (loading) {
    return <Loader />;
  } else {
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
  }
};

export default AuthorsSearchResults;
