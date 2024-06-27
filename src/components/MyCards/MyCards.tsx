import  { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import cardsService from '../../services/cards-service'
import Card from '../Card/Card'
import { CardType } from '../../@types/types'


const MyCards = () => {
    const [myCards, setMyCards] = useState<CardType[]>([]);
    const {_id}= useContext(AuthContext)
    const token=localStorage.getItem("token")

    useEffect(() => {
      console.log(_id);
      if (token)
        cardsService
          .getAllMyCards(token)
          .then((res) => setMyCards(res.data))
          .catch((err) => console.log(err));
    }, []);
  return (
    <div className="d-grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 h-screen">
      {myCards.length === 0 ? (
        <h2 className="absolute text-xl top-50 start-50 translate-middle text-center md:text-6xl ">
          No Cards of you Found
        </h2>
      ) : (
        myCards.map((card) => (
          <Card
            key={card._id}
            card={card}
            myCards={myCards}
            setMyCards={setMyCards}
          />
        ))
      )}
    </div>
  );
}

export default MyCards;