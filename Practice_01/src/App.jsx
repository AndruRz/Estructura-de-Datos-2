import { useState, useEffect } from 'react'
import TurnoActual from './components/TurnoActual'
import './App.css'

function App() {
  const [turnos, setTurnos] = useState(['Turno A-01', 'Turno A-02', 'Turno A-03'])
  const [indiceActual, setIndiceActual] = useState(0)
  const [nuevoTurno, setNuevoTurno] = useState('')
  const [mensaje, setMensaje] = useState('')

  const siguienteTurno = () => {
    setIndiceActual((indiceActual + 1) % turnos.length)
  }

  const agregarTurno = () => {
    if (nuevoTurno.trim() !== '') {
      setTurnos([...turnos, nuevoTurno])
      setNuevoTurno('')
    }
  }

  useEffect(() => {
    if (turnos.length > 0) {
      setMensaje(`Turno actualizado: ${turnos[indiceActual]}`)
    }
  }, [indiceActual])

  return (
    <div className="app-container">

      <header className="app-header">
        <h1>Sistema de Turnos</h1>
        <p className="app-subtitle">Simulación de sistema de turnos con lista circular — Estructura de Datos 2</p>
      </header>

      <section className="seccion-descripcion">
        <h2>Descripción del ejercicio</h2>
        <p>
          Esta aplicación simula un sistema de turnos como el de un banco o clínica. Los turnos están organizados en una <strong>lista circular</strong>, lo que significa 
          que al llegar al último turno, el sistema vuelve automáticamente al primero. Se pueden agregar nuevos turnos a la cola en cualquier momento. 
          Cada vez que el turno cambia, el sistema notifica al usuario mediante un mensaje generado por el hook <strong>useEffect</strong>. La información del turno actual 
          se comunica del componente padre al componente hijo mediante <strong>props</strong>.
        </p>
      </section>

      <main className="app-main">

        <div className="fila-superior">
          <section className="seccion-turno">
            <h2>Turno en Atención</h2>
            <p className="leyenda">
              El turno mostrado es el que está siendo atendido actualmente. Presiona <strong>Siguiente Turno</strong> para avanzar en la cola.
              Al llegar al último, el sistema regresa automáticamente al primero.
            </p>
            <TurnoActual
              turno={turnos[indiceActual]}
              total={turnos.length}
              indice={indiceActual}
            />
            <div className="mensaje-notificacion">{mensaje}</div>
            <button className="btn-siguiente" onClick={siguienteTurno}>
              Siguiente Turno
            </button>
          </section>

          <section className="seccion-agregar">
            <h2>Agregar Turno</h2>
            <p className="leyenda">
              Ingresa el nombre o número del nuevo turno y presiona <strong>Agregar</strong>.
              El turno será añadido al final de la lista circular y quedará disponible en la cola.
            </p>
            <div className="input-group">
              <input
                type="text"
                value={nuevoTurno}
                onChange={(e) => setNuevoTurno(e.target.value)}
                placeholder="Ej: Turno B-01"
                className="input-turno"
              />
              <button className="btn-agregar" onClick={agregarTurno}>
                Agregar
              </button>
            </div>
          </section>
        </div>

        <section className="seccion-lista">
          <h2>Cola de Turnos</h2>
          <p className="leyenda">
            Lista completa de turnos registrados en el sistema.
            El turno resaltado es el que está siendo atendido actualmente.
          </p>
          <ul className="lista-turnos">
            {turnos.map((turno, index) => (
              <li
                key={index}
                className={index === indiceActual ? 'turno-activo' : 'turno-item'}
              >
                {index === indiceActual ? '» ' : ''}{turno}
              </li>
            ))}
          </ul>
        </section>

      </main>

      <footer className="app-footer">
        <div className="footer-item">
          <span className="footer-label">Hecho por: </span>
          <span className="footer-valor">Andre Rodriguez</span>
        </div>
        <div className="footer-item">
          <span className="footer-label">Código: </span>
          <span className="footer-valor">2231841</span>
        </div>
        <div className="footer-item">
          <span className="footer-label">Asignatura: </span>
          <span className="footer-valor">Estructura de Datos 2</span>
        </div>
        <div className="footer-item">
          <span className="footer-label">Docente: </span>
          <span className="footer-valor">Jonathan Lopez Londoño</span>
        </div>
      </footer>

    </div>
  )
}

export default App