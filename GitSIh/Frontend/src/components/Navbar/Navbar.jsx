import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = ({ loggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
    navigate("/"); // Go back to home after logout
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>AgroSmart</div>

      <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        {/*No Home link after login */}
        <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </NavLink>
        <NavLink to="/sensors" onClick={() => setMenuOpen(false)}>
          Sensors
        </NavLink>
        <NavLink to="/crops" onClick={() => setMenuOpen(false)}>
          Crops
        </NavLink>
        <NavLink to="/water" onClick={() => setMenuOpen(false)}>
          Water
        </NavLink>
        <NavLink to="/irrigation" onClick={() => setMenuOpen(false)}>
          Irrigation
        </NavLink>
        <NavLink to="/alerts" onClick={() => setMenuOpen(false)}>
          Alerts
        </NavLink>
        <NavLink to="/settings" onClick={() => setMenuOpen(false)}>
          Settings
        </NavLink>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className={styles.rightControls}>
        <ThemeToggle />
        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
