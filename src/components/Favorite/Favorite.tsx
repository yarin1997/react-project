import { useContext, useEffect, useState } from 'react'
import cardsService from '../../services/cards-service'
import Card from '../Card/Card';
import { CardType } from '../../@types/types';
import { AuthContext } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchBarContext';
import { useDate } from '../../contexts/ThemeContext';
const Favorite = () => {
  const [favCards, setFavCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { _id } = useContext(AuthContext);
  const { theme } = useDate();
const search=useSearch()
  useEffect(() => {
    if (!_id) return; // Ensure _id is available
    cardsService
      .getAllCards().requests
      .then((res) => {
        let favoriteCards: CardType[] = [];
        if(search.value.length===0)
        { favoriteCards = res.data.filter((card: CardType) =>
          card.likes.includes(_id) 
        );}
        else{
           favoriteCards = res.data.filter((card: CardType) =>
            card.likes.includes(_id) && card.title.includes(search.value))
        }
        setFavCards(favoriteCards);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch favorite cards");
        setLoading(false);
        console.error(err);
      });
  }, [_id,favCards,search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className={`text-center fw-bold text-3xl m-2 ${theme==="dark"?"text-white bg-gray-800":"text-gray-800 bg-white"}`}>Favorite</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {favCards.length === 0 ? (
          <p>No favorite cards found</p>
        ) : (
          favCards.map((card) => <Card key={card._id} card={card} />)
        )}
      </div>
    </>
  );
};

export default 
Favorite