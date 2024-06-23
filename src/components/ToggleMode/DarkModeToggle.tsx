import { FaMoon, FaSun } from "react-icons/fa";
import  styles   from "./DarkModeToggle.module.scss";
import { useTheme } from "../../hooks/useTheme";

const DarkModeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button className={`${styles.toggle} ${styles[theme]} fs-3 `} onClick={toggle}>
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default DarkModeToggle;
