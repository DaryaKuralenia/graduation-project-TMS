import "./RandomQuote.scss";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";

const RandomQuote = () => {
  interface IQuoteInfo {
    author: string;
    text: string;
  }

  const [quote, setQuote] = useState<IQuoteInfo[]>([]);
  const [error, setError] = useState("");

  const getRandomQuote = async () => {
    await axios
      .get("https://famous-quotes4.p.rapidapi.com/random", {
        params: {
          category: "all",
          count: 1,
        },
        headers: {
          "X-RapidAPI-Key": "",
          "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
        },
      })
      .then(({ data }) => {
        setQuote(data);
      })
      .catch((err) => setError(err.message));
  };

  useLayoutEffect(() => {
    getRandomQuote();
  }, []);

  // if (error) {
  //   return <div className="random-quote-container">{error}</div>;
  // } else
  return (
    <div className="random-quote-container">
      <p>{quote ? `"${quote.map((el) => el.text)}"` : ""}</p>
      <span>{quote.map((el) => el.author)}</span>
    </div>
  );
};

export default RandomQuote;
