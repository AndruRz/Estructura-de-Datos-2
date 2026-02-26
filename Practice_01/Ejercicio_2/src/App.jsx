import { useState, useEffect, useRef } from 'react'
import ListaCircular from './helpers/ListaCircular'
import ProductoCard from './components/ProductoCard'
import './App.css'

const productos = [
  {
    nombre: 'Audifonos Pro',
    descripcion: 'Audifonos inalambricos con cancelacion de ruido activa.',
    precio: 299,
    imagen: './src/assets/imagen-audifonos-pro.jpg'
  },
  {
    nombre: 'Smartwatch Elite',
    descripcion: 'Reloj inteligente con monitor de salud y GPS integrado.',
    precio: 450,
    imagen: './src/assets/imagen-smartwatct-elite.jpg'
  },
  {
    nombre: 'Camara Mirrorless',
    descripcion: 'Camara profesional de 24 megapixeles con lente 18-55mm.',
    precio: 1200,
    imagen: './src/assets/imagen-camara-mirroless.jpg'
  },
  {
    nombre: 'Teclado Mecanico',
    descripcion: 'Teclado mecanico RGB con switches Cherry MX Red.',
    precio: 180,
    imagen: './src/assets/imagen-teclado-mecanico.jpg'
  },
  {
    nombre: 'Monitor Ultra Wide',
    descripcion: 'Monitor curvo ultrawide 34 pulgadas 144Hz para gaming.',
    precio: 850,
    imagen: './src/assets/imagen-monitor-ultra-wide.jpg'
  }
]

function App() {
  const listaRef = useRef(null)
  const [nodoActual, setNodoActual] = useState(null)
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const lista = new ListaCircular()
    productos.forEach(p => lista.agregar(p))
    listaRef.current = lista
    setNodoActual(lista.cabeza)
  }, [])

  const siguiente = () => {
    setNodoActual(prev => {
      setIndice(i => (i + 1) % listaRef.current.tamanio)
      return prev.siguiente
    })
  }

  const anterior = () => {
    setNodoActual(prev => {
      setIndice(i => (i - 1 + listaRef.current.tamanio) % listaRef.current.tamanio)
      return prev.anterior
    })
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      siguiente()
    }, 4000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="app-container">

      <header className="app-header">
        <h1>Carrusel de Productos</h1>
        <p className="app-subtitle">Lista doblemente enlazada circular — Estructura de Datos 2</p>
      </header>

      <section className="seccion-descripcion">
        <h2>Descripcion del ejercicio</h2>
        <p>
          Esta aplicacion muestra productos en un carrusel implementado con una
          <strong> lista doblemente enlazada circular</strong>, donde cada producto
          conoce al siguiente y al anterior. El ultimo producto conecta de vuelta
          al primero y viceversa. El componente padre maneja la lista en{' '}
          <strong>useState</strong> y pasa el producto actual al hijo mediante{' '}
          <strong>props</strong>. El carrusel cambia automaticamente cada 4 segundos
          usando <strong>useEffect</strong>.
        </p>
      </section>

      <main className="app-main">

        {nodoActual && (
          <div className="carrusel-container">
            <button className="btn-nav btn-anterior" onClick={anterior}>
              &#8592;
            </button>

            <ProductoCard
              producto={nodoActual.producto}
              indice={indice}
              total={listaRef.current.tamanio}
            />

            <button className="btn-nav btn-siguiente" onClick={siguiente}>
              &#8594;
            </button>
          </div>
        )}

        <div className="indicadores">
          {Array.from({ length: listaRef.current?.tamanio || 0 }).map((_, i) => (
            <span
              key={i}
              className={i === indice ? 'indicador activo' : 'indicador'}
            />
          ))}
        </div>

      </main>

      <footer className="app-footer">
        <div className="footer-item">
          <span className="footer-label">Hecho por:</span>
          <span className="footer-valor">Andre Rodriguez</span>
        </div>
        <div className="footer-item">
          <span className="footer-label">Codigo:</span>
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