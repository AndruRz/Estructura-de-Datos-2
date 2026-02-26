function TurnoActual({ turno, total, indice }) {
  return (
    <div className="turno-card">
      <span className="turno-badge">EN ATENCIÓN</span>
      <h2 className="turno-nombre">{turno}</h2>
      <p className="turno-progreso">Turno {indice + 1} de {total}</p>
    </div>
  )
}

export default TurnoActual