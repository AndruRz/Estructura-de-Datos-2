import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Home.css'

export default function Home() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

return (
  <div className="home-container">
    <div className="header">
      <span className="welcome">Bienvenido, <strong>{user?.name}</strong></span>
      <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
    </div>
    <h2 className="subtitle">Mis ejercicios</h2>
    <div className="cards">
      <div className="home-card" onClick={() => navigate('/books')}>
        <h3>Challenge 04</h3>
        <p>Pila de libros</p>
      </div>
      <div className="home-card" onClick={() => navigate('/atm')}>
        <h3>Challenge 05</h3>
        <p>Cola del cajero automático</p>
      </div>
    </div>
  </div>
)
}

