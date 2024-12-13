import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registro from "../src/components/Registro";
import Login from "../src/components/Login";
import Principal from "../src/components/Principal";
import BarraArriba from "../src/components/";
import GestionProductos from "@/src/components/GestionProductos";
import PrincipalUsuario from "@/src/components/PrincipalUsuario";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrincipalUsuario />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Principal" element={<Principal />} />
        <Route path="/BarraArriba" element={<BarraArriba />} />
        <Route path="/GestionProductos" element={<GestionProductos />} />
        <Route path="/PrincipalUsuario" element={<PrincipalUsuario />} />

      </Routes>
    </Router>
  );
}

export default App;
