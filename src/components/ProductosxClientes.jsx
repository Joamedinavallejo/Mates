import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";

const ProductosCliente = ({ carrito, setCarrito }) => {
    const [productos, setProductos] = useState([]); // Almacenará los productos
    const [cantidades, setCantidades] = useState({}); // Manejo de cantidades por producto

    const fetchProductos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "productos"));
            const productosArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProductos(productosArray);

            // Inicializar las cantidades con 1
            const cantidadesIniciales = {};
            productosArray.forEach((producto) => {
                cantidadesIniciales[producto.id] = 1;
            });
            setCantidades(cantidadesIniciales);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    const handleCantidadChange = (id, value) => {
        if (value >= 1) {
            setCantidades((prevCantidades) => ({
                ...prevCantidades,
                [id]: value,
            }));
        }
    };

    const agregarAlCarrito = (producto) => {
        const cantidad = cantidades[producto.id];
        if (cantidad > 0) {
            setCarrito((prevCarrito) => {
                const productoEnCarrito = prevCarrito.find((item) => item.id === producto.id);
    
                if (productoEnCarrito) {
                    // Si el producto ya está en el carrito, actualiza su cantidad
                    return prevCarrito.map((item) =>
                        item.id === producto.id
                            ? { ...item, cantidad: item.cantidad + cantidad }
                            : item
                    );
                } else {
                    return [...prevCarrito, { ...producto, cantidad }];
                }
            });
        }
    };
    

    useEffect(() => {
        fetchProductos();
    }, []);

    const styles = {
        body: {
            margin: 0,
            padding: 0,
            fontFamily: "Arial, sans-serif",
        },
        container: {
            padding: "20px",
            fontFamily: "Arial, sans-serif",
        },
        heading: {
            textAlign: "center",
            color: "#333",
        },
        productList: {
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            padding: 0,
            justifyContent: "center",
        },
        productItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "5px",
            width: "22%",
        },
        productImage: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            marginBottom: "10px",
        },
        quantityInput: {
            width: "50px",
            padding: "5px",
            marginRight: "10px",
            textAlign: "center",
        },
        addButton: {
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        },
        addButtonDisabled: {
            padding: "10px 15px",
            backgroundColor: "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "not-allowed",
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Productos Disponibles</h2>
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
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input
                                        type="number"
                                        min="1"
                                        max={producto.stock}
                                        value={cantidades[producto.id] || 1}
                                        onChange={(e) =>
                                            handleCantidadChange(
                                                producto.id,
                                                parseInt(e.target.value) || 1
                                            )
                                        }
                                        style={styles.quantityInput}
                                    />
                                    <button
                                        style={
                                            producto.stock > 0
                                                ? styles.addButton
                                                : styles.addButtonDisabled
                                        }
                                        disabled={producto.stock === 0}
                                        onClick={() => agregarAlCarrito(producto)}
                                    >
                                        Añadir al carrito
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

export default ProductosCliente;
