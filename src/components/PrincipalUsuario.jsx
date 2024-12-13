import React, { useState } from "react";
import BotonLogin from "../components/BotonLogin";
import BarraArribaUsuario from "../components/BarraArribaUsuario";
import ProductosClientes from "../components/ProductosClientes";
import CarritoDeCompras from "../components/CarritoDeCompras";

const Principal = () => {
  const [carrito, setCarrito] = useState([]);

  return (
    <>
      <BarraArribaUsuario />

      <div style={styles.mainContainer}>
        <div style={styles.contenido}>
          <BotonLogin />
          <div style={styles.productosContainer}>
            {/* Pasamos carrito y setCarrito a ProductosClientes */}
            <ProductosClientes carrito={carrito} setCarrito={setCarrito} />
          </div>
        </div>
      </div>

      {/* Botón del carrito */}
      <CarritoDeCompras carrito={carrito} setCarrito={setCarrito} />
    </>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    padding: "20px",
    overflowY: "auto",
    alignItems: "center",
  },
  contenido: {
    textAlign: "center",
    width: "100%",
  },
  productosContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    overflowY: "auto",
  },
  botonGestion: {
    position: "absolute",
    top: "12px",
    right: "60px",
  },
  imagenBoton: {
    width: "25px",
    height: "25px",
  },
};

export default Principal;