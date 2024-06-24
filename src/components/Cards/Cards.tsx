import {useContext, useEffect, useState} from "react";
import './Cards.scss'
import Card from "../Card/Card";
import { CardType } from "../../@types/types";
import {  CircularProgress } from "@mui/material";
import cardsService from "../../services/cards-service";
import { AuthContext } from "../../contexts/AuthContext";
import { useSearch } from "../../contexts/SearchBarContext";
import { toast } from "react-toastify";
import { useDate } from "../../contexts/ThemeContext";
import "react-toastify/dist/ReactToastify.css";

const Cards = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [cardData, setData] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const search = useSearch();
  const { theme } = useDate();
 
  useEffect(() => {
    setLoading(true);
    const { requests, cancel } = cardsService.getAllCards();
    requests
      .then((response) => {
        let filterCards: CardType[] = [];
           if (search.value.length > 0) {
             console.log(search.value);
             filterCards = response.data.filter((card: CardType) =>
               card.title.toLowerCase().includes(search.value.toLowerCase())
             );
           } else {
             filterCards = response.data;
           }
        setData(filterCards);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
       if (error.name === "CanceledError") return;
       setError(error.message);
       setLoading(false);
       toast.error("An error occurred. Please try again later.");
      });
      
    return () => {
      cancel();
    };
  }, [search]);
  if (error) return <div >{error}</div>;
    if (loading)
      return (
        <div className="m-0-auto">
          <CircularProgress color="secondary" />
        </div>
      );
  return (
    <div className="Cards-Container">
      <h1
        className={`underline text-3xl font-bold text-center mt-2 ${
          theme === "dark" ? "text-white bg-gray-800" : "text-gray-800 bg-light"
        }`}
      >
        Cards Page
      </h1>
      <h3
        className={`text-2xl text-center font-bold mb-2 ${
          theme === "dark" ? "text-white bg-gray-800" : "text-gray-800 bg-light"
        }`}
      >
        Here you can find business cards from all categories
      </h3>
      <hr />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((card, index) =>
          isLoggedIn ? (
            <Card key={card._id} card={card} />
          ) : (
            index < 3 && <Card key={card._id} card={card} />
          )
        )}
      </section>
    </div>
  );
};
export default Cards