import "./Header.scss";
import React, { useState } from "react";
import logo from "..//..//img/openlibrary-logo.svg";
import SearchInput from "./Search/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const MyLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1.5em;
  font-weight: bold;
  :hover {
    color: rgb(46, 19, 121);
    transition: all 0.5s;
  }
`;

const Header = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="header-container">
        <div className="header-container__logo" onClick={(e) => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <MyLink to="/my-books">My books</MyLink>
        <SearchInput />
        <div className="header-container__user-icon">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div
          className="header-container__burger-menu"
          onClick={() => {
            setBurgerMenuActive(!burgerMenuActive);
          }}
        >
          <span className="material-symbols-outlined">menu</span>
        </div>
      </div>
      <BurgerMenu
        burgerMenuActive={burgerMenuActive}
        setBurgerMenuActive={setBurgerMenuActive}
      />
    </>
  );
};

export default Header;
