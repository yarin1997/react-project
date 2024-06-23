import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useDate } from "../../contexts/ThemeContext";
import  './Footer.scss'
import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
    const { isLoggedIn, isBusiness, isAdmin, login, logout } =useContext(AuthContext);
    const {theme}=useDate()
  return (
    <>
      <footer
        className={`footer ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        {isLoggedIn && (
          <div>
            <NavLink to={"/myCards"} className={" d-flex flex-col"}>
              <AccountBoxIcon className="profile align-self-center" />
              <p className="">My Cards</p>
            </NavLink>
          </div>
        )}

        {isLoggedIn && (
          <div>
            <NavLink to={"/Favorites"} className={" d-flex flex-col"}>
              <FavoriteIcon className="align-self-center text-danger" />
              <p className="">Favorites</p>
            </NavLink>
          </div>
        )}
        <div className="about">
          <NavLink to={"/About"} className={" d-flex flex-col"}>
            <button className="button align-self-center border border-1 rounded-circle ">
              i
            </button>
            <p>About</p>
          </NavLink>
        </div>
      </footer>
    </>
  );
};
export default Footer;
