import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    const ok = login(email, password)
    if (ok) {
      navigate('/home', { replace: true })
    } else {
      setError('Correo o contraseña incorrectos')
    }
  }

return (
  <div className="login-container">
    <div className="login-card">
      <h1 className="title">Iniciar sesión</h1>
      <input className="input" type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <button className="button" onClick={handleLogin}>Ingresar</button>
    </div>
  </div>
)
}