import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Config";
import BarraArriba from "../components/BarraArriba";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState("");
  const [editProducto, setEditProducto] = useState(null);

  // Fetch productos de Firebase
  const fetchProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productosArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosArray);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nombre || !precio || !descripcion || !stock || !imagen) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "productos"), {
        nombre,
        precio: parseFloat(precio),
        descripcion,
        stock: parseInt(stock, 10),
        imagen,
      });
      console.log("Producto agregado con ID:", docRef.id);
      fetchProductos();
      limpiarFormulario();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!nombre || !precio || !descripcion || !stock || !imagen) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const productoRef = doc(db, "productos", editProducto);
    try {
      await updateDoc(productoRef, {
        nombre,
        precio: parseFloat(precio),
        descripcion,
        stock: parseInt(stock, 10),
        imagen,
      });
      console.log("Producto actualizado");
      setEditProducto(null);
      fetchProductos();
      limpiarFormulario();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    const productoRef = doc(db, "productos", id);
    try {
      await deleteDoc(productoRef);
      console.log("Producto eliminado");
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleEdit = (producto) => {
    setEditProducto(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setDescripcion(producto.descripcion);
    setStock(producto.stock);
    setImagen(producto.imagen);
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setDescripcion("");
    setStock("");
    setImagen("");
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "Arial, sans-serif",
      overflowY: "auto",
      minHeight: "100vh",
    },
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "auto",
    },
    heading: {
      textAlign: "center",
      color: "#333",
    },
    form: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
    input: {
      padding: "12px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #ddd",
      marginBottom: "15px",
      width: "100%",
      boxSizing: "border-box",
    },
    textarea: {
      padding: "12px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #ddd",
      resize: "vertical",
      minHeight: "100px",
      marginBottom: "15px",
      width: "100%",
      boxSizing: "border-box",
    },
    button: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",
      width: "100%",
    },
    productList: {
      listStyleType: "none",
      padding: 0,
      maxHeight: "calc(100vh - 200px)",
    },
    productItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#f9f9f9",
      border: "1px solid #ddd",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "5px",
    },
    productImage: {
      maxWidth: "100%",
      maxHeight: "200px",
      borderRadius: "5px",
      objectFit: "cover",
      marginBottom: "10px",
    },
    productDetails: {
      textAlign: "center",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "10px",
    },
    smallButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "background-color 0.3s ease",
    },
    smallButton2: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.body}>
      <BarraArriba />
      <div style={styles.container}>
        <h2 style={styles.heading}>Gestión de Productos</h2>
        <form onSubmit={editProducto ? handleSave : handleAdd} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <textarea
            style={styles.textarea}
            placeholder="Descripción del producto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Cantidad en stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="URL de la imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
          <button style={styles.button} type="submit">
            {editProducto ? "Guardar Cambios" : "Agregar Producto"}
          </button>
        </form>
        <ul style={styles.productList}>
          {productos.map((producto) => (
            <li key={producto.id} style={styles.productItem}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={styles.productImage}
              />
              <div style={styles.productDetails}>
                <strong>{producto.nombre}</strong>
                <p>${producto.precio}</p>
                <p>{producto.descripcion}</p>
                <p>
                  <strong>Stock:</strong> {producto.stock}
                </p>
                <div style={styles.buttonGroup}>
                  <button
                    style={styles.smallButton}
                    onClick={() => handleEdit(producto)}
                  >
                    Editar
                  </button>
                  <button
                    style={styles.smallButton2}
                    onClick={() => handleDelete(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GestionProductos;
