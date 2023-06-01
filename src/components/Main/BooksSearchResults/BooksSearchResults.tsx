import "./BooksSearchResults.scss";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../contexts/SearchContext";
import Pagination from "../../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { BASE_URL } from "../../URL";

export interface IBookInfo {
  author_name: Array<string>;
  cover_edition_key: string;
  already_read_count?: number;
  currently_reading_count?: number;
  edition_count: number;
  first_publish_year: number;
  person?: Array<string>;
  place?: Array<string>;
  ratings_average?: number;
  title: string;
  want_to_read_count?: number;
  key: string;
}

const BooksSearchResults = () => {
  const { valueToFind, searchOption } = useContext(SearchContext);
  const [booksInfo, setBooksInfo] = useState<IBookInfo[]>([]);
  const [booksAmount, setBooksAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const getBooksBySearch = async () => {
    setLoading(true);
    await axios
      .get(
        `${BASE_URL}/search.json?title=${valueToFind}&limit=${PER_PAGE}&sort=editions`
      )
      .then(({ data }) => {
        setBooksInfo(data.docs);
        setBooksAmount(data.numFound);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getBooksBySearch();
  }, [valueToFind]);

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setPage(selectedPage + 1);

    axios
      .get(
        `${BASE_URL}/search.json?title=${valueToFind}&limit=${PER_PAGE}&offset=${
          PER_PAGE * (selectedPage - 1) + PER_PAGE
        }&sort=editions`
      )
      .then(({ data }) => {
        setBooksInfo(data.docs);
      })
      .catch((err) => setError(err.message));
  };

  if (loading) return <Loader />;
  else
    return (
      <div className="info-container__books">
        <p className="info-container__books-search-details">
          {booksAmount !== 0
            ? `Search results for: ${valueToFind}. ${booksAmount} books found.`
            : `Nothing was found for ${valueToFind}.`}
        </p>
        {booksInfo.map((el) => (
          <div key={el.key} className="info-container__books-book-info">
            <img
              src={`https://covers.openlibrary.org/b/olid/${el.cover_edition_key}-M.jpg?default=https://openlibrary.org/images/icons/avatar_book.png`}
              alt={`${el.cover_edition_key}`}
            />

            <div className="info-container__books-book-detalization">
              <h4 onClick={() => navigate(`/book-editions/${el.key.slice(7)}`)}>
                {el.title}
              </h4>
              <h5>By {el.author_name}</h5>
              <p>
                <span>Person: </span>
                {el.person ? el.person.join(", ") : ""}
              </p>
              <p>
                <span>Place: </span>
                {el.place ? el.place.join(", ") : ""}
              </p>
              <p>
                <span>First publish year: </span>
                {el.first_publish_year}
              </p>
              <p>
                <span>Amount of editions: </span>
                {el.edition_count}
              </p>
            </div>
            <div className="info-container__books-book-statistics">
              <h5>
                <span>Rating: </span>
                {el?.ratings_average ? el?.ratings_average?.toFixed(2) : 0}
              </h5>
              <h5>
                <span>Already read: </span>
                {el.already_read_count ? el.already_read_count : 0}
              </h5>
              <h5>
                <span>Currently reading: </span>
                {el.currently_reading_count ? el.currently_reading_count : 0}
              </h5>
              <h5>
                <span>Want to read: </span>
                {el.want_to_read_count ? el.want_to_read_count : 0}
              </h5>
            </div>
          </div>
        ))}
        {booksAmount === 0 ? (
          ""
        ) : (
          <Pagination
            PER_PAGE={PER_PAGE}
            booksAmount={booksAmount}
            setPage={setPage}
            handlePageClick={handlePageClick}
          />
        )}
      </div>
    );
};

export default BooksSearchResults;
