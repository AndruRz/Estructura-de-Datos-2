import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/AtmPage.css'

class Queue {
  constructor() { this.items = [] }
  enqueue(item) { this.items.push(item) }
  dequeue() { return this.items.length > 0 ? this.items.shift() : null }
  isEmpty() { return this.items.length === 0 }
  print() { return [...this.items] }
}

const randomDate = () => {
  const start = new Date(2025, 0, 1)
  const end = new Date()
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().slice(0, 16).replace('T', ' ')
}

const atmQueue = new Queue()
atmQueue.enqueue({ name: "André Pérez", amount: 500000, arrivalDate: randomDate() })
atmQueue.enqueue({ name: "Pablo Rodriguez", amount: 200000, arrivalDate: randomDate() })
atmQueue.enqueue({ name: "Lana Garbanza", amount: 350000, arrivalDate: randomDate() })

export default function AtmPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [queue] = useState(atmQueue)
  const [people, setPeople] = useState(queue.print().sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate)))
  const [form, setForm] = useState({ name: '', amount: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = () => {
    if (!form.name || !form.amount) return
    queue.enqueue({ name: form.name, amount: Number(form.amount), arrivalDate: randomDate() })
    setPeople(queue.print().sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate)))
    setForm({ name: '', amount: '' })
  }

  const handleLogout = () => { logout(); navigate('/login', { replace: true }) }

  return (
    <div className="page">
      <div className="content">
        <div className="nav">
          <button className="btn-primary" onClick={() => navigate('/home')}>Volver</button>
          <span className="username">{user?.name}</span>
          <button className="btn-danger" onClick={handleLogout}>Cerrar sesión</button>
        </div>

        <h1 className="page-title">Cola del cajero</h1>

        <div className="form-card">
          <input className="input" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
          <input className="input" name="amount" placeholder="Monto del retiro" type="number" value={form.amount} onChange={handleChange} />
          <button className="btn-primary" onClick={handleAdd}>Agregar persona</button>
        </div>

        <div className="person-list">
          {people.map((person, i) => (
            <div key={i} className="person-card">
              <p><strong>#{i + 1} {person.name}</strong></p>
              <p className="person-card-sub">$ {person.amount.toLocaleString()} | Llegó: {person.arrivalDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}