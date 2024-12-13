import React from "react";
import { useNavigate } from "react-router-dom";

const BotonPrincipal = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/Principal");
  };

  const styles = {
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <button
      onClick={handleRedirect}
      style={styles.button}
      onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
      onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
    >
      Principal
    </button>
  );
};

export default BotonPrincipal;
