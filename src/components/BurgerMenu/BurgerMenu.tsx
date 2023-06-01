import { useNavigate } from "react-router-dom";
import "./BurgerMenu.scss";
import { FC, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export interface IBurgerMenuProps {
  burgerMenuActive: boolean;
  setBurgerMenuActive: (burgerMenuActive: boolean) => void;
}

const BurgerMenu: FC<IBurgerMenuProps> = ({
  burgerMenuActive,
  setBurgerMenuActive,
}) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
    setBurgerMenuActive(false);
  };

  return (
    <div
      className={burgerMenuActive ? "burger-menu active" : "burger-menu"}
      onClick={onClick}
    >
      <nav
        className="burger-menu-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>My Open Library</h3>
        <li
          onClick={() => {
            navigate("/my-books");
            setBurgerMenuActive(false);
          }}
        >
          My books
        </li>
        <li onClick={onClick}>My profile</li>
        <li onClick={onClick}>Settings</li>
        <li
          onClick={() => {
            setUser(null);
            navigate("/");
            setBurgerMenuActive(false);
          }}
        >
          Log out
        </li>
        <h3>Browse</h3>
        <li onClick={onClick}>Trending</li>
        <li onClick={onClick}>Library Explorer</li>
        <li onClick={onClick}>Subjects</li>
        <li onClick={onClick}>Books</li>
      </nav>
    </div>
  );
};

export default BurgerMenu;
