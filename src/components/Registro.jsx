import React, { useState } from "react";
import { auth, db } from "../firebase/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import BarraArriba from "./";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar la información del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        nombre: nombre,
        email: email,
        uid: user.uid
      });

      setMessage("Registro exitoso!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setMessage("Error al registrar");
    }
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9'
    },
    h1: {
      textAlign: 'center',
      color: '#333',
      fontSize: '2rem',
      marginBottom: '20px'
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem'
    },
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none'
    },
    button: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    p: {
      textAlign: 'center',
      fontSize: '1rem'
    },
    link: {
      color: '#007bff',
      textDecoration: 'none'
    },
    linkHover: {
      textDecoration: 'underline'
    },
    message: {
      textAlign: 'center',
      color: '#28a745',
      fontSize: '1.2rem',
      marginTop: '20px'
    },
    errorMessage: {
      textAlign: 'center',
      color: '#dc3545',
      fontSize: '1.2rem',
      marginTop: '20px'
    }
  };

  return (
    <div>
      <BarraArriba />
      <h1 style={styles.h1}>Registro</h1>
      <form onSubmit={handleRegistro} style={styles.form}>
        {/* Campo de nombre */}
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
        />
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
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Registrar
        </button>
      </form>
      {message && (
        <p style={message.includes("Error") ? styles.errorMessage : styles.message}>
          {message}
        </p>
      )}
      <p style={styles.p}>
        ¿Ya tienes cuenta? <Link to="/Login" style={styles.link}>Inicia sesión</Link>
      </p>
    </div>
  );
}

export default Registro;
