import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/BooksPage.css'

class Stack {
  constructor() { this.items = [] }
  push(value) { this.items.push(value) }
  pop() { return this.items.length > 0 ? this.items.pop() : null }
  isEmpty() { return this.items.length === 0 }
  print() { return [...this.items].reverse() }
}

const bookStack = new Stack()
bookStack.push({ name: "El Principito", isbn: "978-0156012195", author: "Antoine de Saint-Exupéry", editorial: "Salamandra" })
bookStack.push({ name: "Cien años de soledad", isbn: "978-0307474728", author: "Gabriel García Márquez", editorial: "Sudamericana" })
bookStack.push({ name: "Don Quijote de la Mancha", isbn: "978-8420412146", author: "Miguel de Cervantes", editorial: "Alfaguara" })

export default function BooksPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [stack] = useState(bookStack)
  const [books, setBooks] = useState(stack.print())
  const [form, setForm] = useState({ name: '', isbn: '', author: '', editorial: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = () => {
    if (!form.name || !form.isbn || !form.author || !form.editorial) return
    stack.push({ ...form })
    setBooks(stack.print())
    setForm({ name: '', isbn: '', author: '', editorial: '' })
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

        <h1 className="page-title">Pila de libros</h1>

        <div className="form-card">
          <input className="input" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
          <input className="input" name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
          <input className="input" name="author" placeholder="Autor" value={form.author} onChange={handleChange} />
          <input className="input" name="editorial" placeholder="Editorial" value={form.editorial} onChange={handleChange} />
          <button className="btn-primary" onClick={handleAdd}>Añadir libro</button>
        </div>

        <div className="book-list">
          {books.map((book, i) => (
            <div key={i} className="book-card">
              <p><strong>{book.name}</strong> — {book.author}</p>
              <p className="book-card-sub">ISBN: {book.isbn} | {book.editorial}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}