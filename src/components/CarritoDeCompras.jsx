import React, { useState } from "react";

const CarritoDeCompras = ({ carrito, setCarrito }) => {
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    // Calcular el total del carrito
    const calcularTotal = () => {
        return carrito.reduce(
            (total, item) => total + item.precio * item.cantidad,
            0
        );
    };

    // Función para eliminar un producto del carrito
    const eliminarProducto = (id) => {
        console.log("Función eliminarProducto llamada con id:", id);
        setCarrito((prevCarrito) => {
            const nuevoCarrito = prevCarrito.filter((item) => item.id !== id);
            console.log("Nuevo carrito después de eliminar:", nuevoCarrito);
            return nuevoCarrito;
        });
    };

    // Verifica el carrito al cargar el componente
    console.log("Carrito inicial:", carrito);

    const styles = {
        botonCarrito: {
            position: "fixed",
            top: "6px",
            right: "102px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
        },
        imagenCarrito: {
            width: "30px", // Ajusta el tamaño de la imagen del botón
            height: "30px",
        },
        modal: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "5px",
            width: "90%",
            maxWidth: "500px",
            padding: "20px",
            zIndex: 999,
        },
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
        },
        carritoHeading: {
            textAlign: "center",
        },
        carritoList: {
            maxHeight: "300px",
            overflowY: "auto",
        },
        carritoItem: {
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #ffffff",
        },
        itemName: {
            flex: 1,
        },
        itemPrice: {
            marginLeft: "20px",
        },
        eliminarButton: {
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
            fontSize: "13px",
            margin: "5px",
        },
        cerrarButton: {
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
        },
        finalizarButton: {
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
        },
        total: {
            fontWeight: "bold",
            marginTop: "10px",
            textAlign: "right",
        },
    };
    const finalizarCompra = () => {
        console.log("Compra finalizada con éxito!");
        setCarrito([]);
        setMostrarCarrito(false);
    };

    return (
        <>
            <button
                style={styles.botonCarrito}
                onClick={() => setMostrarCarrito(true)}
            >
                <img src="assets/images/Carrito.png" alt="Carrito de Compras" style={styles.imagenCarrito} />
            </button>
            {mostrarCarrito && (
                <>
                    <div
                        style={styles.overlay}
                        onClick={() => setMostrarCarrito(false)}
                    ></div>
                    <div style={styles.modal}>
                        <h3 style={styles.carritoHeading}>Carrito de Compras</h3>
                        {carrito.length > 0 ? (
                            <>
                                <ul style={styles.carritoList}>
                                    {carrito.map((item) => (
                                        <li key={item.id} style={styles.carritoItem}>
                                            <span style={styles.itemName}>{item.nombre}</span>
                                            <span style={styles.itemPrice}>{item.cantidad}x ${item.precio}</span>
                                            <span style={styles.itemPrice}>
                                                Subtotal: ${item.precio * item.cantidad}
                                            </span>
                                            <button
                                                style={styles.eliminarButton}
                                                onClick={() => eliminarProducto(item.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div style={styles.total}>
                                    Total: ${calcularTotal()}
                                </div>

                                <button
                                    style={styles.finalizarButton}
                                    onClick={finalizarCompra}
                                >
                                    Finalizar compra
                                </button>
                            </>
                        ) : (
                            <p>No hay productos en el carrito.</p>
                        )}
                        <button
                            style={styles.cerrarButton}
                            onClick={() => setMostrarCarrito(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default CarritoDeCompras;
