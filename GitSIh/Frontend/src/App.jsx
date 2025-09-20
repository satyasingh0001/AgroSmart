import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard";
import Sensors from "./pages/Sensors";
import Crops from "./pages/Crops";
import Water from "./pages/Water";
import Irrigation from "./pages/Irrigation";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedLogin = localStorage.getItem("loggedIn") === "true";
    if (savedLogin) setLoggedIn(true);
  }, []);

  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
  };

  const handleLogout = () => {
    setUsername("");
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  return (
    <>
      {/* Navbar only after login */}
      {loggedIn && <Navbar loggedIn={loggedIn} onLogout={handleLogout} />}

      <Layout loggedIn={loggedIn}>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          {!loggedIn && <Route path="/" element={<Home />} />}
          {!loggedIn && (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          )}

          {/* Protected routes */}
          {loggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sensors" element={<Sensors />} />
              <Route path="/crops" element={<Crops />} />
              <Route path="/water" element={<Water />} />
              <Route path="/irrigation" element={<Irrigation />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
              {/* Redirect any public route back to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            // Block private routes when not logged in
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
