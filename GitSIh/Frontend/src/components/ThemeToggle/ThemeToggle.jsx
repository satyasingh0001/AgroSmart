import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={styles.toggleWrapper}>
      <input
        type="checkbox"
        id="theme-toggle"
        className={styles.toggleCheckbox}
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle" className={styles.toggleLabel}>
        <span className={styles.sun}>☀️</span>
        <span className={styles.moon}>🌙</span>
        <span className={styles.ball}></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
