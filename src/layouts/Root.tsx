import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDate } from "../contexts/ThemeContext";
const Root =()=>{
  const {theme}=useDate();

    return (
      <div
        className={`flex flex-col gap-10  text-blue-500 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Header />
        <main className=" w-11/12 m-auto ">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
}
export default Root