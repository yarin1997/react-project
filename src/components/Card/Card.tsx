import {  useContext, useEffect, useState } from 'react'
import './Card.scss'
 import { CardType } from '../../@types/types';
 import { AuthContext } from '../../contexts/AuthContext';
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import DeleteIcon from "@mui/icons-material/Delete";
   import { BsTelephone } from "react-icons/bs";
import cardsService from '../../services/cards-service';
import { useDate } from "../../contexts/ThemeContext";
import { useNavigate } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";

export type CardProps= {
    image: {
        url: string;
        alt: string;
        _id: string;
    }
    title: string;
    description: string;
    phone: string;
    adress: string;
    cardNumber:number;
}
export type CardProps2 = {
  card: CardType;
  myCards?: CardType[];
  setMyCards?: (cards: CardType[]) => void;
};

const Card = ({ card, myCards, setMyCards }: CardProps2) => {
  const { isLoggedIn, isAdmin, _id, token } =
    useContext(AuthContext);
  const { _id: cardId, image, title, description, phone, address } = card;
  const { theme } = useDate();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [alt, setAlt] = useState<string>(image.alt);
  useEffect(() => {
    cardsService
      .getCardById(cardId)
      .then((res) => {
        if (res.data.likes.includes(_id)) setIsFavorite(true);
        else setIsFavorite(false);
      })
      .catch((error) => console.log(error));
     
  }, []);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://www.computerhope.com/issues/pictures/default.png";
      setAlt("default.png")
  };
  const handleLikeClick = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(!isFavorite);
    cardsService
      .likeUnlikeCard(cardId, token)
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.log(error);
        setIsFavorite(!newIsFavorite);
      });
  };
  const navigate = useNavigate();
  const handleDivClick = () => {
    const dataToPass = { key: card }; 
    navigate("/CardInfo", { state: dataToPass });
  };
  const handleUpdateCard = () => {
    const dataToPass = { key: card }; 
    navigate("/EditCard", { state: dataToPass });
  };
const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      cardsService
        .deleteCard(cardId, token, card.bizNumber)
        .then((res) => {
          console.log(res);
          if (setMyCards && myCards) {
            console.log("here");
            const new1 = myCards.filter((c) => c._id !== cardId);
            setMyCards(new1);
          }
        })
        .catch((error) => console.log(error));
    }
};
  return (
    <div
      className={`Card-Container cursor-pointer  ${
        theme === "dark" ? "bg-gray-800 text-white" :"bg-white text-gray-800"
      }`}
    >
      <img
        src={image.url}
        onError={handleError}
        alt={alt}
        className=" h-60 rounded "
        onClick={handleDivClick}
      />
      <h1 className="text-3xl font-bold">Title: {title}</h1>
      <h3 className="text-xl font-medium">
        Description:{" "}
        {description.length > 25
          ? description.slice(0, 25) + "..."
          : description}
      </h3>
      <hr />
      <p className="card__phone">Phone: {phone}</p>
      <p className="card__adress">City: {address.city}</p>

      <div
        className={`d-flex gap-2 align-items-center justify-content-between ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="d-flex gap-2 ml-2 ">
          {isAdmin && <DeleteIcon className="text-secondary cursor-pointer" />}
          {card.user_id === _id && (
            <EditIcon className=" cursor-pointer" onClick={handleUpdateCard} />
          )}
          {card.user_id === _id && (
            <DeleteIcon className="crusor-pointer" onClick={handleDelete} />
          )}
        </div>
        <div className="d-flex gap-2 mr-2 ">
          {isLoggedIn && (
            <FavoriteIcon
              onClick={() => handleLikeClick()}
              className={`${
                isFavorite ? "text-danger" : "text-secondary"
              } cursor-pointer mt-auto`}
            />
          )}
          <BsTelephone />
        </div>
      </div>
    </div>
  );
};
export default Card