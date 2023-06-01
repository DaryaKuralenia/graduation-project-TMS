import "./RandomQuote.scss";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";

const RandomQuote = () => {
  interface IQuoteInfo {
    author: string;
    text: string;
  }

  const [quote, setQuote] = useState<IQuoteInfo[]>([]);
  const [error, setError] = useState(null);

  const getRandomQuote = async () => {
    await axios
      .get("https://famous-quotes4.p.rapidapi.com/random", {
        params: {
          category: "all",
          count: 1,
        },
        headers: {
          "X-RapidAPI-Key":
            "5289e49711msh22210f833ae2245p1e28dajsn5a9a8ae125aa",
          "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
        },
      })
      .then(({ data }) => {
        setQuote(data);
      })
      .catch((err) => setError(err));
  };

  useLayoutEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="random-quote-container">
      <p>{quote ? `"${quote.map((el) => el.text)}"` : error}</p>
      <span>{quote.map((el) => el.author)}</span>
    </div>
  );
};

export default RandomQuote;
