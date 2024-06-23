import apiClient from "./api-client";
import { CardType } from "../@types/types";
import { FormData } from "../components/CreateNewCard/CreateCard";
class CardService {
  getCardById(id: string) {
    return apiClient.get<CardType>(`/cards/${id}`)
  }

  getAllMyCards(token: string) {
   return apiClient.get<CardType[]>(`/cards/my-cards`, {
    headers: {
      "x-auth-token": token
    }
   })
  }
getAllCards() {
      const controller = new AbortController();
       const signal = controller.signal;
 const requests= apiClient.get<CardType[]>('/cards', {
    signal,
  })
  return {requests, cancel : () => controller.abort()}
}
addCard(card: FormData, token: string) {
  return apiClient.post('/cards', card,
    {
      headers: {
        "x-auth-token": token
      }
    }
  )
}

updateCard(id:string,card: FormData,token:string) {
  return apiClient.put(`/cards/${id}`, card,{
    headers: {
      "x-auth-token": token
    }
  })
}

deleteCard(id: string, token: string, bizNumber: number) {
  console.log(bizNumber)
    return apiClient.delete(`/cards/${id}`, {
      headers: {
        "x-auth-token": token
      },
      data:{
        "bizNumber": bizNumber
      }
    })
}
  likeUnlikeCard(id: string, token: string) {
    return apiClient.patch(`/cards/${id}`, 
    {headers:
      { "x-auth-token": token}})
  }
}
export default new CardService()