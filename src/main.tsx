import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Register from './components/Register/Register.tsx'
import Root from './layouts/Root.tsx'
import Error from './routes/Error.tsx'
import Cards from './components/Cards/Cards.tsx'
import Login from './components/Login.tsx'
import About from './components/About/About.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import MyCards from './components/MyCards/MyCards.tsx';
import CreateCard from './components/CreateNewCard/CreateCard.tsx';
import Favorite from './components/Favorite/Favorite.tsx';
import { SearchProvider } from './contexts/SearchBarContext.tsx';
import UpdateUser from './components/UpdateUser/UpdateUser.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import CardInfo from './components/Card/CardInfo.tsx';
import EditCard from './components/MyCards/EditCard.tsx';
import Admin from './components/CRM_Admin/Admin.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Cards /> },
      { path: "/register", element: <Register /> },
      { path: "/Login", element: <Login /> },
      { path: "/About", element: <About /> },
      { path: "/myCards", element: <MyCards /> },
      { path: "/CreateCard", element: <CreateCard /> },
      { path: "/Favorites", element: <Favorite /> },
      { path: "/user", element: <UpdateUser /> },
      { path: "/CardInfo", element: <CardInfo /> },
      { path: "/EditCard", element: <EditCard /> },
      { path: "/Admin", element: <Admin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(

    <AuthContextProvider>
      <SearchProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </SearchProvider>
    </AuthContextProvider>
);
