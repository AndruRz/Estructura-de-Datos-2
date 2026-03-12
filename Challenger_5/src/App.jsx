import { useState } from 'react'
import './App.css'

class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) { this.items.push(item); }
  dequeue() { return this.items.length > 0 ? this.items.shift() : null; }
  peek() { return this.items.length > 0 ? this.items[0] : null; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  print() { return [...this.items]; }
}

const randomDate = () => {
  const start = new Date(2025, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().slice(0, 16).replace('T', ' ');
};

const atmQueue = new Queue();
atmQueue.enqueue({ name: "André Pérez",   amount: 500000, arrivalDate: randomDate() });
atmQueue.enqueue({ name: "Pablo Rodriguez",    amount: 200000, arrivalDate: randomDate() });
atmQueue.enqueue({ name: "Lana Garbanza",  amount: 350000, arrivalDate: randomDate() });

function App() {
  const [queue] = useState(atmQueue);
  const [people, setPeople] = useState(
    queue.print().sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate))
  );
  const [form, setForm] = useState({ name: '', amount: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.amount) return;
    const newPerson = {
      name: form.name,
      amount: Number(form.amount),
      arrivalDate: randomDate()
    };
    queue.enqueue(newPerson);
    setPeople(queue.print().sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate)));
    setForm({ name: '', amount: '' });
  };

  return (
    <div>
      <h1>Cola de cajeros automáticos</h1>

      <div>
        <input name="name"   placeholder="Nombre" value={form.name}   onChange={handleChange} />
        <input name="amount" placeholder="Monto del retiro" value={form.amount} onChange={handleChange} type="number" />
        <button onClick={handleAdd}>Agregar persona a la cola</button>
      </div>

      <div>
        {people.map((person, index) => (
          <div key={index}>
            <p><strong>#{index + 1} {person.name}</strong></p>
            <p>Cantidad: ${person.amount.toLocaleString()} | Llegó: {person.arrivalDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App