import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import "./LogoScreen.css";

const LogoScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("");
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="full-screen">

      {/* Logo Animation */}
      <Motion.img
        src="/Logo.png"
        alt="Logo"
        className="logo-img"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Name Animation */}
      <Motion.div
        className="logo_name"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <h1>PlanetX</h1>
      </Motion.div>

      {/* Tagline Animation */}
      <Motion.div
        className="tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h2>Empowering Education, Inspiring Minds</h2>
      </Motion.div>

    </div>
  );
};

export default LogoScreen;