import { ReactNode } from 'react';
import { string } from 'zod';
export type LoginUser = {
  token: any;
  email: string;
  password: string;
};

export type RegisterUser = {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  image?: {
    url: string;
    alt?: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;
};


export type CardType = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
    _id: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
    _id: string;
  };
  bizNumber: number;
  likes: string[];
  user_id: string;
  createdAt: string;
  __v: number;
};

export type ErrorType = {
  status: number;
  message: string;
  details: string;
};

export type Update_User = {
    name: {
        first: string,
        last: string,
        middle: string
    },
    phone: string,
    image: {
        url: string,
        alt: string
    },
    address: {
        state: string,
        country: string,
        city: string,
        street: string,
        houseNumber: string,		
        zip: string
    }	

}
type UserResponse = {
  _id: string;
  name: {
    first: string;
    middle: string;
    last: string;
    _id: string;
  };
  phone: string;
  email: string;
  image: {
    url: string;
    alt: string;
    _id: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
    _id: string;
  };
  isAdmin: boolean;
  isBusiness: boolean;
  createdAt: string;
};








export type FCC = ({ children: ReactNode }) => ReactNode;