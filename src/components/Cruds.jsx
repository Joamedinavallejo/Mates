import React, { useState } from "react";
import BarraArriba from "../components/BarraArriba";
import GestionProductos from "../components/GestionProductos";

const Crud = () => {
  const [refresh, setRefresh] = useState(false);

  const handleProductoAgregado = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={styles.container}>
      <BarraArriba />
      <GestionProductos onProductoAgregado={handleProductoAgregado} />
    </div>
  );
};

export default Crud;
