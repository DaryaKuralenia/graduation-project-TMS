import "./HomePage.scss";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import RandomQuote from "./RandomQuote";
import SubjectBooks from "./SubjectBooks";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-container__top">
        <RandomQuote />
      </div>
      <div className="homepage-container__bottom">
        {/* <SubjectBooks subject={"love"} /> */}
        {/* <SubjectBooks subject={"thrillers"} />
        <SubjectBooks subject={"kids"} />
        <SubjectBooks subject={"drama"} /> */}
      </div>
    </div>
  );
};

export default HomePage;
