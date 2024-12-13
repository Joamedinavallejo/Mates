import React, { useState } from "react";
import { auth } from "../firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Config";
import BarraArriba from "../components/BarraArriba";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        if (role === "admin") {
          navigate("/Principal");
        } else {
          navigate("/principalUsuario");
        }
      } else {
        setMessage("No se encontró información del usuario");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMessage("Error al iniciar sesión");
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#333",
      minHeight: "100vh",
    },
    content: {
      width: "100%",
      maxWidth: "400px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "7px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    h1: {
      textAlign: "center",
      fontSize: "2rem",
      margin: "20px 0",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
    },
    button: {
      padding: "10px",
      margin: "10px 0",
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
    p: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "1rem",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
    message: {
      textAlign: "center",
      fontSize: "1.2rem",
      marginTop: "20px",
      color: message.includes("Error") ? "#dc3545" : "#28a745",
    },
  };

  return (
    <>
      <BarraArriba />
      <div style={styles.container}>
        <h1 style={styles.h1}>Iniciar Sesión</h1>
        <div style={styles.content}>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = styles.button.backgroundColor)
              }
            >
              Iniciar sesión
            </button>
          </form>
          {message && <p style={styles.message}>{message}</p>}
          <p style={styles.p}>
            ¿No tienes cuenta?{" "}
            <Link to="/Registro" style={styles.link}>
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
