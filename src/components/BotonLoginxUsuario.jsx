import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BotonLogin = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleRedirect = () => {
    navigate("/loginUsuario");
  };

  const styles = {
    button: {
      position: "fixed",
      top: "13px",
      right: "20px",
      border: "none",
      background: "none",
      padding: 0,
      cursor: "pointer",
      zIndex: 1000,
    },
    image: {
      width: "20px",
      height: "20px",
      transition: "transform 0.3s ease",
      transform: isHovered ? "scale(1.1)" : "scale(1)",
    },
  };

  return (
    <button
      onClick={handleRedirect}
      style={styles.button}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="./assets/images/usuario.png"
        alt="Iniciar Sesión"
        style={styles.image}
      />
    </button>
  );
};

export default BotonLogin;
