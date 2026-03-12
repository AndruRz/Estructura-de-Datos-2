import { useState } from 'react'
import './App.css'

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) { this.items.push(value); }
  pop() { return this.items.length > 0 ? this.items.pop() : null; }
  peek() { return this.items.length > 0 ? this.items[this.items.length - 1] : null; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  print() { return [...this.items].reverse(); }
  
}

const bookStack = new Stack();
bookStack.push({ name: "El Principito", isbn: "978-0156012195", author: "Antoine de Saint-Exupéry", editorial: "Salamandra" });
bookStack.push({ name: "Cien años de soledad", isbn: "978-0307474728", author: "Gabriel García Márquez", editorial: "Sudamericana" });
bookStack.push({ name: "Don Quijote de la Mancha", isbn: "978-8420412146", author: "Miguel de Cervantes", editorial: "Alfaguara" });
bookStack.push({ name: "La sombra del viento", isbn: "978-8408172177", author: "Carlos Ruiz Zafón", editorial: "Planeta" });
bookStack.push({ name: "Como agua para chocolate", isbn: "978-0385420174", author: "Laura Esquivel", editorial: "Planeta" });

function App() {
  const [stack] = useState(bookStack);
  const [books, setBooks] = useState(stack.print());
  const [form, setForm] = useState({ name: '', isbn: '', author: '', editorial: '' });

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleAdd = () => {
    if (!form.name || !form.isbn || !form.author || !form.editorial) return;
    stack.push({ ...form });
    setBooks(stack.print());
    setForm({ name: '', isbn: '', author: '', editorial: '' });
};

  return (
    <div>
      <h1>Pila de libros</h1>

      <div>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
        <input name="author" placeholder="Autor" value={form.author} onChange={handleChange} />
        <input name="editorial" placeholder="Editorial" value={form.editorial} onChange={handleChange} />
        <button onClick={handleAdd}>Añadir libro</button>
      </div>

      <div>
        {books.map((book, index) => (
          <div key={index}>
            <p><strong>{book.name}</strong> — {book.author}</p>
            <p>ISBN: {book.isbn} | Editorial: {book.editorial}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App