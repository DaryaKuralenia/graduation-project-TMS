import "./SubjectBooks.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";

type PropTypes = {
  subject: string;
};

const SubjectBooks = ({ subject }: PropTypes) => {
  interface ISubjectBooks {
    title: string;
    cover_edition_key: string;
    key: string;
    authors: [{ name: string }];
  }

  const [books, setBooks] = useState<ISubjectBooks[]>([]);
  const [workCount, setWorkCount] = useState(0);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const PER_PAGE = 5;

  const handlePageClickNext = () => {
    setPrevBtnDisabled(false);
    Math.ceil(workCount / PER_PAGE) === page
      ? setNextBtnDisabled(true)
      : setPage(page + 1);

    axios
      .get(
        `https://openlibrary.org/subjects/${subject}.json?limit=${PER_PAGE}&offset=${
          page * PER_PAGE + 1
        }`
      )
      .then((res) => setBooks(res.data.works));
  };

  const handlePageClickPrev = () => {
    page === 1 ? setPrevBtnDisabled(true) : setPage(page - 1);
    console.log(page - 1);

    axios
      .get(
        `https://openlibrary.org/subjects/${subject}.json?limit=${PER_PAGE}&offset=${
          (page - 1) * PER_PAGE + 1
        }`
      )
      .then((res) => setBooks(res.data.works));
  };

  const getBooksBySubject = async () => {
    await axios
      .get(
        `https://openlibrary.org/subjects/${subject}.json?limit=${PER_PAGE}&offset=1`
      )
      .then(({ data }) => {
        setBooks(data.works);
        setWorkCount(data.work_count);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getBooksBySubject();
  }, []);

  return (
    <section className="books-container">
      <div className="books-container__subject">{subject}</div>
      <div className="books-container__books">
        <div className="books-container__books-selector">
          <button
            className="prev-btn"
            onClick={handlePageClickPrev}
            disabled={prevBtnDisabled}
          >
            <span className="material-symbols-outlined">
              arrow_back_ios_new
            </span>
          </button>
        </div>
        {books.map((el) => (
          <div key={el.key} className="books-container__book">
            <img
              src={`https://covers.openlibrary.org/b/olid/${el.cover_edition_key}-M.jpg?default=https://openlibrary.org/images/icons/avatar_book.png`}
              alt={`${el.cover_edition_key}`}
              className="books-container__book-cover"
            />
            <p className="books-container__book-title">{el.title}</p>
            {/* <span className="books-container__author-name">
              {el.authors.map((item) => item.name)}
            </span> */}
          </div>
        ))}
        <div className="books-container__books-selector">
          <button className="next-btn" onClick={handlePageClickNext}>
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubjectBooks;
