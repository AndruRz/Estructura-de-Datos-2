function ProductoCard({ producto, indice, total }) {
  return (
    <div className="producto-card">
      <div className="producto-imagen-container">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="producto-imagen"
        />
      </div>
      <div className="producto-info">
        <span className="producto-badge">Producto {indice + 1} de {total}</span>
        <h2 className="producto-nombre">{producto.nombre}</h2>
        <p className="producto-descripcion">{producto.descripcion}</p>
        <p className="producto-precio">${producto.precio}</p>
      </div>
    </div>
  )
}

export default ProductoCard