import "./BookInfo.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader/Loader";
import { BASE_URL } from "../../URL";
import { useSelector, useDispatch } from "react-redux";

export interface IBookInfo {
  [index: string]: {
    authors?: Array<{}>;
    cover?: Array<string>;
    number_of_pages?: number;
    publish_date?: string;
    publish_places?: [];
    publishers?: Array<{}>;
    title?: string;
    full_title: string;
    excerpts?: Array<{}>;
    key: string;
  };
}

interface IExcerpts {
  comment?: string;
  text: string;
  first_sentence?: boolean;
}

const BookInfo = () => {
  const [bookInfo, setBookInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const bookmarks = useSelector((state: any) => state.bookmarks);
  const dispatch = useDispatch();

  const { id } = useParams();

  const bookKey = `OLID:${id}`;

  const getBookInfo = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/api/books?bibkeys=${bookKey}&jscmd=data&format=json`)
      .then(({ data }) => {
        setBookInfo(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getBookInfo();
    setLoading(false);
  }, []);

  const bookmarkHandler = (shouldAddBookmark: boolean) => {
    dispatch({
      type: shouldAddBookmark ? "ADD_BOOKMARK" : "REMOVE_BOOKMARK",
      payload: bookKey,
    });
  };

  if (loading) return <Loader />;
  else
    return (
      <div className="book-info-container">
        <div className="book-info-container__left">
          <img
            src={
              bookInfo[bookKey]?.cover
                ? bookInfo[bookKey]?.cover?.large
                : `${BASE_URL}/images/icons/avatar_book.png`
            }
            alt={`${bookKey} cover`}
          />
          <div className="book-info-container__left-buttons">
            <button>Borrow</button>
            <button
              onClick={() => {
                bookmarkHandler(bookmarks.includes(bookKey) ? false : true);
              }}
            >
              {bookmarks.includes(bookKey)
                ? "Added to your list"
                : " Want to read"}
            </button>
            <div className="book-info-container__left-raiting">
              <span className="material-symbols-outlined">star_rate</span>
              <span className="material-symbols-outlined">star_rate</span>
              <span className="material-symbols-outlined">star_rate</span>
              <span className="material-symbols-outlined">star_rate</span>
              <span className="material-symbols-outlined">star_rate</span>
            </div>
          </div>
        </div>
        <div className="book-info-container__right">
          <div>
            <h4>{bookInfo[bookKey]?.full_title || bookInfo[bookKey]?.title}</h4>
            <h5 className="book-info-container__right-authors">
              by{" "}
              {bookInfo[bookKey]?.authors.map(
                (el: { name: string; url: string }) => (
                  <span
                    key={el.name}
                    onClick={() => {
                      navigate(
                        `/author/${el.url.slice(32, el.url.lastIndexOf("/"))}`
                      );
                    }}
                  >
                    {el.name}
                  </span>
                )
              )}
            </h5>
            <p className="book-info-container__right-details">
              {bookInfo[bookKey]?.excerpts
                ? bookInfo[bookKey]?.excerpts
                    .filter((el: IExcerpts) => el?.comment === "first sentence")
                    .map((el: { text: string }) => el.text) ||
                  bookInfo[bookKey]?.excerpts.map(
                    (el: { text: string }) => el.text
                  )
                : ""}
            </p>
            {bookInfo[bookKey]?.subject_people ? (
              <p className="book-info-container__right-details">
                Subject people:
                <span>
                  {bookInfo[bookKey]?.subject_people
                    .map((el: { name: string }) => el.name)
                    .join(", ")}
                </span>
              </p>
            ) : (
              ""
            )}
            {bookInfo[bookKey]?.subject_places ? (
              <p className="book-info-container__right-details">
                Subject places:
                <span>
                  {bookInfo[bookKey]?.subject_places
                    .map((el: { name: string }) => el.name)
                    .join(", ")}
                </span>
              </p>
            ) : (
              ""
            )}
            {bookInfo[bookKey]?.subject_times ? (
              <p className="book-info-container__right-details">
                Subject times:
                <span>
                  {bookInfo[bookKey]?.subject_times
                    .map((el: { name: string }) => el.name)
                    .join(", ")}
                </span>
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="book-info-container__right-statistics">
            <h5>
              <span>Pages: </span>
              <br />
              {bookInfo[bookKey]?.number_of_pages
                ? bookInfo[bookKey]?.number_of_pages
                : "-"}
            </h5>
            <h5>
              <span>Publish date: </span>
              <br />
              {bookInfo[bookKey]?.publish_date
                ? bookInfo[bookKey]?.publish_date
                : "-"}
            </h5>
            <h5>
              <span>Published in: </span>
              <br />
              {bookInfo[bookKey]?.publish_places
                ? bookInfo[bookKey]?.publish_places?.map(
                    (el: { name: string }) => el.name
                  )
                : "-"}
            </h5>
            <h5>
              <span>Publishers: </span>
              <br />
              {bookInfo[bookKey]?.publishers
                ? bookInfo[bookKey]?.publishers.map(
                    (el: { name: string }) => el.name
                  )
                : "-"}
            </h5>
          </div>
        </div>
      </div>
    );
};

export default BookInfo;
