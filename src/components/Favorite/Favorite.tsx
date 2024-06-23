import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import cardsService from '../../services/cards-service'
import Card from '../Card/Card';
import { CardType } from '../../@types/types';
import { AuthContext } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchBarContext';

const Favorite = () => {
  const [favCards, setFavCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { _id } = useContext(AuthContext);
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
  }, [_id,favCards,search]); // Add _id as a dependency to ensure it runs when _id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className="text-center text-3xl m-2">Favorite</h1>
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