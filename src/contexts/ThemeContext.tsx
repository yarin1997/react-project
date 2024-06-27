import React,{ createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggle: () => {},
});
export const useDate=()=>useContext(ThemeContext)
export const ThemeProvider = ({ children}:{ children:React.ReactNode }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") ?? "light";
    setTheme(currentTheme);
    if (currentTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const newValue = theme === "light" ? "dark" : "light";

    localStorage.setItem("theme", newValue);
    if (newValue === "dark") {
      document.body.classList.add("drak");
    } else {
      document.body.classList.remove("dark");
    }
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
