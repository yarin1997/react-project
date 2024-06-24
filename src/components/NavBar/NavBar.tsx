import './NavBar.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { RxAvatar } from 'react-icons/rx';
import { BsFilePlus } from 'react-icons/bs';
import InputSearch from '../Input/InputSearch';
import DarkModeToggle from '../ToggleMode/DarkModeToggle';
import { useDate } from '../../contexts/ThemeContext';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
const NavBar = () => {
const { isLoggedIn, isBusiness,isAdmin,  logout } = useContext(AuthContext);
const {theme}=useDate()
const [isOpen, setIsOpen] = useState(false);
const [loc,setLoc]=useState("")
  const location = useLocation().pathname;
useEffect(() => {
  setLoc(location)
},[location])
const ToggleButton=() => {
  setIsOpen(!isOpen);
}
 const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    return (
      <nav className="  ">
        <div
          className={`flexi fw-bold  ${
            theme === "dark" ? " bg-gray-800" : " bg-white"
          }`}
        >
          <div
            className={`flexi  ${
              theme === "dark"
                ? " bg-gray-800 text-white"
                : " bg-white text-gray-800"
            }`}
          >
            <NavLink to={"/"} className="cursor-pointer text-3xl font-bold">
              BCard
            </NavLink>
            <a href="/About" className="anchor">
              ABOUT
            </a>
            {isLoggedIn && (
              <NavLink to="/Favorites" className={"text-base md:text-2xl "}>
                Fav
              </NavLink>
            )}
            {isBusiness && (
              <NavLink
                to="/myCards"
                className={"text-base md:text-2xl whitespace-nowrap"}
              >
                My Cards
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to="/Admin" className={"text-base md:text-2xl"}>
                CRM
              </NavLink>
            )}
          </div>
          {(loc === "/" || loc === "/myCards" || loc === "/Favorites") && (
            <InputSearch />
          )}
          <div
            className={`flexi${
              theme === "dark"
                ? " bg-gray-800 text-white"
                : " bg-white text-gray-800"
            }`}
          >
            <DarkModeToggle />
            <NavLink to="/" className={"fs-5 "}>
              Cards
            </NavLink>
            {!isLoggedIn && (
              <NavLink to="/register" className={"fs-5 "}>
                Register
              </NavLink>
            )}
            {!isLoggedIn && (
              <NavLink to="/login" className={"fs-5 "}>
                Login
              </NavLink>
            )}
            {isLoggedIn && (
              <button
                className={"fs-5 "}
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            )}
            {isBusiness && (
              <NavLink to="/createCard">
                <BsFilePlus className="fs-3" title="create card" />
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink to="/user">
                <RxAvatar className="fs-3 " title="Edit user" />
              </NavLink>
            )}
          </div>
        </div>
        {/* the resopnsive part: */}
        <div className="menu ">
          <MenuIcon className="icon fs-1 " onClick={ToggleButton} />
          {isOpen && (
            <div
              className={`menu-items ${
                scrolled ? "bg-transparent" : "bg-light"
              }`}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "fit-content",
              }}
            >
              <a href="/About" className="anchor">
                ABOUT
              </a>
              {isLoggedIn && (
                <NavLink to="/Favorites" className={"text-base md:text-2xl "}>
                  Fav
                </NavLink>
              )}
              {isBusiness && (
                <NavLink
                  to="/myCards"
                  className={"text-base md:text-2xl whitespace-nowrap"}
                >
                  My Cards
                </NavLink>
              )}
              {isAdmin && (
                <NavLink to="/Admin" className={"text-base md:text-2xl"}>
                  CRM
                </NavLink>
              )}

              <NavLink to="/" className={"fs-5 "}>
                Cards
              </NavLink>
              {!isLoggedIn && (
                <NavLink to="/register" className={"fs-5 "}>
                  Register
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink to="/login" className={"fs-5 "}>
                  Login
                </NavLink>
              )}
              {isLoggedIn && (
                <button
                  className={"fs-5 "}
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              )}
              {isBusiness && (
                <NavLink to="/createCard">
                  <BsFilePlus className="fs-3" title="create card" />
                </NavLink>
              )}

              {isLoggedIn && (
                <NavLink to="/user">
                  <RxAvatar className="fs-3  " title="Edit user" />
                </NavLink>
              )}
            </div>
          )}
          {(loc === "/" || loc === "/myCards" || loc === "/Favorites") && (
            <InputSearch />
          )}
          <DarkModeToggle />
          <NavLink to={"/"} className="cursor-pointer text-xl font-bold mr-5">
            <HomeIcon />
          </NavLink>
        </div>
      </nav>
    );
}
export default NavBar;