import { UserContext } from "..//../contexts/UserContext";
import "./MyBooks.scss";
import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../URL";
import { useNavigate } from "react-router-dom";

const MyBooks = () => {
  const { user } = useContext(UserContext);
  const bookmarks = useSelector((state: any) => state.bookmarks);

  const [myBooks, setMyBooks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getBookInfo = async () => {
    await axios
      .get(
        `${BASE_URL}/api/books?bibkeys=${bookmarks.join(
          ","
        )}&jscmd=data&format=json`
      )
      .then(({ data }) => {
        setMyBooks(data);
      })
      .catch((err) => setError(err));
  };

  const bookObj = Object.values(myBooks);

  useEffect(() => {
    getBookInfo();
  }, []);

  return (
    <div className="my-books-container">
      <nav className="my-books-container__sidebar">
        <h2>User:{user.login}</h2>
        <ul>
          <li>Loans</li>
          <li>Loan history</li>
          <li>Currently reading</li>
          <li>Want to read ({bookmarks.length})</li>
          <li>Already read</li>
          <li>My notes</li>
          <li>My reviews</li>
        </ul>
      </nav>
      <div className="my-books-container__details">
        <h2>My books</h2>
        <div>
          <h3>My loans</h3>
          <p>No books are on this shelf</p>
        </div>
        <div>
          <h3>Currently reading</h3>
          <p>No books are on this shelf</p>
        </div>
        <div className="my-books-container__details-want-to-read">
          <h3>Want to read {`(${bookmarks.length})`}</h3>
          <div className="want-to-read">
            {bookmarks.length ? (
              bookObj.map((el: any) => (
                <figure
                  key={el.key}
                  onClick={() => {
                    navigate(`${el.key}`);
                  }}
                >
                  <img src={el.cover.medium} alt={`${el.key}`} />
                  <figcaption>{el.title || el.full_title}</figcaption>
                </figure>
              ))
            ) : (
              <p>No books are on this shelf</p>
            )}
          </div>
        </div>
        <div>
          <h3>Already read</h3>
          <p>No books are on this shelf</p>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
