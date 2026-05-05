import { useState } from 'react';
import SearchEngine from './structures/SearchEngine';
import './App.css';

const products = [
  { name: 'air max', popularity: 90 },
  { name: 'air force', popularity: 95 },
  { name: 'air jordan', popularity: 85 },
  { name: 'adidas boost', popularity: 80 },
];

const engine = new SearchEngine();
products.forEach((p) => engine.insert(p.name, p.popularity));

function App() {
  const [prefix, setPrefix] = useState('');
  const [k, setK] = useState('');
  const [results, setResults] = useState([]);

  function handleSearch() {
    if (!prefix || !k) return;
    const topK = engine.searchTopK(prefix, parseInt(k));
    setResults(topK);
  }

  return (
    <div className="container">
      <h1>Smart Search Engine</h1>

      <section>
        <h2>Productos disponibles</h2>
        <div className="product-list">
          {products.map((p, i) => (
            <div className="product-item" key={i}>
              <span className="product-name">{p.name}</span>
              <span className="product-popularity">{p.popularity}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Buscar Top K</h2>
        <div className="search-row">
          <input
            type="text"
            placeholder="Prefijo (ej: air)"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
          <input
            type="number"
            placeholder="K"
            value={k}
            onChange={(e) => setK(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </section>

      <section>
        <h2>Resultados</h2>
        <div className="results-list">
          {results.length === 0 ? (
            <p className="empty">Ingresa un prefijo y un K para buscar</p>
          ) : (
            results.map((p, i) => (
              <div className="result-item" key={i}>
                <span className="result-rank">#{i + 1}</span>
                <span className="result-name">{p.name}</span>
                <span className="result-popularity">{p.popularity}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;