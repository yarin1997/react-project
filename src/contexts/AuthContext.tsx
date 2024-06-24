import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


interface AuthContextType {
  isLoggedIn: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  _id: string;
  token:string;
  login: (jwt: string) => void;
  logout: () => void;
}

interface DecodedToken {
  isBusiness: boolean;
  isAdmin: boolean;
  _id: string;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isBusiness: false,
  isAdmin: false,
   _id: "",
   token:"",
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [_id, setId] = useState("");
  const [token, setToken] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode<DecodedToken>(token);
      setIsBusiness(decodedToken?.isBusiness);
      setIsAdmin(decodedToken?.isAdmin);
      setId(decodedToken?._id);
      setToken(token);
    }
  }, [token]);

  const login = (jwt: string) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", jwt);

    const decodedToken = jwtDecode<DecodedToken>(jwt);
    setIsBusiness(decodedToken?.isBusiness);
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isBusiness,isAdmin, login, logout, _id,token }}>
      {children}
    </AuthContext.Provider>
  );
};
