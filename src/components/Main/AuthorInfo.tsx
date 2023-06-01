import "./AuthorInfo.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

const AuthorInfo = () => {
  const [authorName, setAuthorName] = useState("");
  const [bio, setBio] = useState("");
  const [authorKey, setAuthorKey] = useState("");
  const [authorBirthDate, setAuthorBirthDate] = useState("");
  const [authorDeathDate, setAuthorDeathDate] = useState("");
  const [wikipediaLink, setWikipediaLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  interface IWorksByAnAuthor {
    title: string;
    key: string;
    covers?: [number];
    subject_times?: [string];
    subject_places?: [string];
    subject_people?: [string];
  }

  const [worksByAnAuthor, setWorksByAnAuthor] = useState<IWorksByAnAuthor[]>(
    []
  );
  const [amountOfWorksByAnAuthor, setAmountOfWorksByAnAuthor] = useState(0);

  const { id } = useParams();

  const getAuthorById = async () => {
    await axios
      .get(`https://openlibrary.org/authors/${id}.json`)
      .then(({ data }) => {
        setAuthorName(data.name);
        setBio(data.bio?.value || data.bio);
        setAuthorKey(data.key);
        setAuthorBirthDate(data.birth_date);
        setAuthorDeathDate(data?.death_date);
        setWikipediaLink(data.wikipedia);
      })
      .catch((err) => setError(err));
  };

  const getWorksByAnAuthor = async () => {
    await axios
      .get(
        `https://openlibrary.org/authors/${id}/works.json?limit=${PER_PAGE}&offset=1`
      )
      .then(({ data }) => {
        setWorksByAnAuthor(data.entries);
        setAmountOfWorksByAnAuthor(data.size);
      })
      .catch((err) => setError(err));
  };

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setPage(selectedPage + 1);
    console.log(selectedPage + 1);

    axios
      .get(
        `https://openlibrary.org/authors/${id}/works.json?limit=${PER_PAGE}&offset=${
          PER_PAGE * (selectedPage - 1) + PER_PAGE + 1
        }`
      )
      .then(({ data }) => {
        setWorksByAnAuthor(data.entries);
        setAmountOfWorksByAnAuthor(data.size);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    setLoading(true);
    getAuthorById();
    getWorksByAnAuthor();
    setLoading(false);
  }, []);

  return (
    <div className="author-info-container">
      <div className="author-info-subcontainer">
        <div className="author-info-subcontainer__description">
          <div className="author-info-subcontainer__description-text">
            <h3>{authorName}</h3>
            <h5>
              {authorBirthDate} - {authorDeathDate}
            </h5>
            <p>{bio}</p>
          </div>
          <div className="author-info-subcontainer__description-img">
            <img
              src={`https://covers.openlibrary.org/a/olid/${id}-M.jpg`}
              alt={`${authorKey}`}
            />

            {wikipediaLink ? (
              <a href={`${wikipediaLink}`} target="_blank">
                Wikipedia link
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="author-info-subcontainer__works">
          <h4>{amountOfWorksByAnAuthor} works</h4>
          <div className="author-info-subcontainer__works-items">
            {
              <ul>
                {worksByAnAuthor.map((el) => (
                  <li key={el.key}>
                    {el.covers && el.covers[0] > 0 ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${el.covers[0]}-M.jpg`}
                        alt=""
                      />
                    ) : (
                      <img
                        src={`https://openlibrary.org/images/icons/avatar_book.png`}
                        alt=""
                      />
                    )}
                    <div className="author-info-subcontainer__book-info">
                      <h4>{el.title}</h4>
                      <div>
                        {el.subject_places ? (
                          <p>
                            <span>Subject places: </span>
                            {el.subject_places.join(", ")}
                          </p>
                        ) : (
                          ""
                        )}
                        {el.subject_times ? (
                          <p>
                            <span>Subject times: </span>
                            {el.subject_times.join(", ")}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            }
          </div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={Math.ceil(amountOfWorksByAnAuthor / PER_PAGE)}
            onPageChange={handlePageClick}
            containerClassName={"paginatio"}
            previousLinkClassName={"paginatio__link"}
            nextLinkClassName={"paginatio__link"}
            disabledLinkClassName={"paginatio__link--disabled"}
            activeLinkClassName={"paginatio__link--active"}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
