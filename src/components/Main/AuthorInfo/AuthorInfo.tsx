import "./AuthorInfo.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import WorksByAnAuthor from "../WorksByAnAuthor/WorksByAnAuthor";
import Loader from "../../Loader/Loader";
import { BASE_URL } from "../../URL";

const AuthorInfo = () => {
  const [authorName, setAuthorName] = useState("");
  const [bio, setBio] = useState("");
  const [authorKey, setAuthorKey] = useState("");
  const [authorBirthDate, setAuthorBirthDate] = useState("");
  const [authorDeathDate, setAuthorDeathDate] = useState("");
  const [wikipediaLink, setWikipediaLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  const getAuthorById = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/authors/${id}.json`)
      .then(({ data }) => {
        setAuthorName(data.name);
        setBio(data.bio?.value || data.bio);
        setAuthorKey(data.key);
        setAuthorBirthDate(data.birth_date);
        setAuthorDeathDate(data?.death_date);
        setWikipediaLink(data?.wikipedia);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAuthorById();
  }, []);

  if (loading) return <Loader />;
  else
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
                src={`https://covers.openlibrary.org/a/olid/${id}-L.jpg`}
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
          <WorksByAnAuthor id={id} />
        </div>
      </div>
    );
};

export default AuthorInfo;
