import "./WorksByAnAuthor.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../Pagination/Pagination";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../URL";

type WorksByAnAuthorProps = {
  id: string | undefined;
};

const WorksByAnAuthor = ({ id }: WorksByAnAuthorProps) => {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const navigate = useNavigate();

  const getWorksByAnAuthor = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/authors/${id}/works.json?limit=${PER_PAGE}&offset=1`)
      .then(({ data }) => {
        setWorksByAnAuthor(data.entries);
        setAmountOfWorksByAnAuthor(data.size);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setPage(selectedPage + 1);

    axios
      .get(
        `${BASE_URL}/authors/${id}/works.json?limit=${PER_PAGE}&offset=${
          PER_PAGE * (selectedPage - 1) + PER_PAGE + 1
        }`
      )
      .then(({ data }) => {
        setWorksByAnAuthor(data.entries);
        setAmountOfWorksByAnAuthor(data.size);
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    getWorksByAnAuthor();
  }, []);

  if (loading) return <Loader />;
  else
    return (
      <div className="author-info-subcontainer__works">
        <h4 className="author-info-subcontainer__works-amount">
          {amountOfWorksByAnAuthor} works:
        </h4>
        <div className="author-info-subcontainer__works-items">
          {
            <ul>
              {worksByAnAuthor.map((el) => (
                <li key={el.key}>
                  {el.covers && el.covers[0] > 0 ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${el.covers[0]}-M.jpg`}
                      alt={`${el.title} cover`}
                    />
                  ) : (
                    <img
                      src={`${BASE_URL}/images/icons/avatar_book.png`}
                      alt=""
                    />
                  )}
                  <div className="author-info-subcontainer__book-info">
                    <h4
                      onClick={() =>
                        navigate(`/book-editions/${el.key.slice(7)}`)
                      }
                    >
                      {el.title}
                    </h4>
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
        <Pagination
          PER_PAGE={PER_PAGE}
          booksAmount={amountOfWorksByAnAuthor}
          setPage={setPage}
          handlePageClick={handlePageClick}
        />
      </div>
    );
};

export default WorksByAnAuthor;
