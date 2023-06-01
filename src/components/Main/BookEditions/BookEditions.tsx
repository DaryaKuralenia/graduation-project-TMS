import "./BookEditions.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { BASE_URL } from "../../URL";

interface IBookEditions {
  key: string;
  publish_date?: string;
  full_title?: string;
  title: string;
  publishers?: [];
  languages?: [];
}

const BookEditions = () => {
  const [bookEditions, setBookEditions] = useState<IBookEditions[]>([]);
  const [editionsAmount, setEditionsAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const getBookEditions = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/works/${id}/editions.json`)
      .then(({ data }) => {
        setBookEditions(data.entries);
        setEditionsAmount(data.size);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getBookEditions();
  }, []);

  if (loading) return <Loader />;
  else
    return (
      <div className="editions-container">
        <ul className="editions-container__editions">
          {bookEditions.map((el) => (
            <li key={el.key}>
              <img
                src={`https://covers.openlibrary.org/b/olid/${el.key.slice(
                  7
                )}-M.jpg?default=https://openlibrary.org/images/icons/avatar_book.png`}
                alt=""
              />
              <div>
                <h3
                  onClick={() => {
                    navigate(`/books/${el.key.slice(7)}`);
                  }}
                >
                  {el.full_title || el.title}
                </h3>
                <br />
                Publish date: {el.publish_date}
                <br />
                Publishers: {el.publishers ? el.publishers.join(", ") : ""}
                <br />
                Languages:{" "}
                {el.languages
                  ? el.languages.map((el: { key: string }) => el.key.slice(11))
                  : ""}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default BookEditions;
