import React from "react";
import { useDate } from "../../contexts/ThemeContext";
import { useSearch } from "../../contexts/SearchBarContext";
import './Input.scss'

const InputSearch: React.FC = () => {
  const { value, setValue } = useSearch();
  const {theme}=useDate()

  return (
    <div
      className="input-search-container"
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        className={`form-control forms  icon-rtl${
          theme === "dark" ? "bg-white text-gray-800" : "bg-gray-600 text-white"
        }`}
        
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Card.."
        name="search"
      />
      
    </div>
  );
};

export default InputSearch;
