import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ trie, heap, graph, onSongInserted }) {
  const [newTitle,     setNewTitle]     = useState("");
  const [newPlays,     setNewPlays]     = useState("");
  const [insertMsg,    setInsertMsg]    = useState(null);
  const [query,        setQuery]        = useState("");
  const [suggestions,  setSuggestions]  = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  const handleInsert = () => {
    const title = newTitle.trim();
    const plays = parseInt(newPlays, 10);

    if (!title) {
      setInsertMsg({ ok: false, text: "El título no puede estar vacío." });
      return;
    }
    if (isNaN(plays) || plays < 0) {
      setInsertMsg({ ok: false, text: "Ingresa un número de reproducciones válido." });
      return;
    }
    if (trie.search(title)) {
      setInsertMsg({ ok: false, text: `"${title}" ya existe en el sistema.` });
      return;
    }

    trie.insert(title);
    heap.insert(title, plays);
    graph.addSong(title);

    setInsertMsg({ ok: true, text: `"${title}" agregada con ${plays.toLocaleString()} plays.` });
    setNewTitle("");
    setNewPlays("");
    setTimeout(() => setInsertMsg(null), 3000);

    onSongInserted(); 
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchResult(null);
    setSuggestions(value.trim() ? trie.startsWith(value) : []);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearchResult(trie.search(query));
    setSuggestions([]);
  };

  const handleSuggestionClick = (s) => {
    setQuery(s);
    setSuggestions([]);
    setSearchResult(trie.search(s));
  };

  return (
    <div className="searchbar-container">

      <div className="searchbar-section">
        <h3 className="searchbar-label">➕ Insertar canción</h3>
        <div className="searchbar-insert-wrapper">
          <input
            type="text"
            placeholder="Título de la canción..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInsert()}
          />
          <input
            type="number"
            placeholder="Reproducciones"
            value={newPlays}
            min="0"
            onChange={(e) => setNewPlays(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInsert()}
          />
          <button onClick={handleInsert}>Agregar</button>
        </div>

        {insertMsg && (
          <p className={`searchbar-result ${insertMsg.ok ? "result--ok" : "result--error"}`}>
            {insertMsg.ok ? "✅" : "❌"} {insertMsg.text}
          </p>
        )}
      </div>

      <div className="searchbar-section">
        <h3 className="searchbar-label">🔍 Buscar canción</h3>
        <div className="searchbar-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Escribe el nombre de una canción..."
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        {suggestions.length > 0 && (
          <ul className="searchbar-suggestions">
            {suggestions.map((s, i) => (
              <li key={i} onClick={() => handleSuggestionClick(s)}>{s}</li>
            ))}
          </ul>
        )}

        {searchResult !== null && (
          <p className={`searchbar-result ${searchResult ? "result--ok" : "result--error"}`}>
            {searchResult
              ? `✅ "${query}" encontrada en el sistema.`
              : `❌ "${query}" no existe en el sistema.`}
          </p>
        )}
      </div>

    </div>
  );
}

export default SearchBar;