import { useEffect, useState } from "react";
import BinaryTree from "./utils/BinaryTree";
import TreeVisualizer from "./components/TreeVisualizer";
import "./App.css";

const tree = new BinaryTree();
const numbers = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
numbers.forEach((num) => tree.insert(num));

const treeD3Data = tree.toD3Format();

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isFound, setIsFound] = useState(null);

  useEffect(() => {
    console.log("=== ÁRBOL BINARIO ===");
    console.log("Números insertados:", numbers);
    console.log("InOrder  (L-N-R):", tree.inOrder());
    console.log("PreOrder (N-L-R):", tree.preOrder());
    console.log("PostOrder(L-R-N):", tree.postOrder());
  }, []);

  const handleSearch = () => {
    const num = parseInt(searchValue);
    if (isNaN(num)) {
      setSearchResult("Por favor ingresa un número válido");
      setIsFound(null);
      return;
    }
    const found = tree.contains(num);
    setIsFound(found);
    setSearchResult(
      found
        ? `✅ El valor ${num} SÍ está en el árbol`
        : `❌ El valor ${num} NO está en el árbol`
    );
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Challenge 08 - Binary Tree</h1>

      <section className="section">
        <h2>Números insertados</h2>
        <p className="numbers-display">{numbers.join(" - ")}</p>
      </section>

      <section className="section">
        <h2>Recorridos del árbol</h2>
        <div className="traversal-item">
          <strong>InOrder:</strong>
          <span>{tree.inOrder().join(" - ")}</span>
        </div>
        <div className="traversal-item">
          <strong>PreOrder:</strong>
          <span>{tree.preOrder().join(" - ")}</span>
        </div>
        <div className="traversal-item">
          <strong>PostOrder:</strong>
          <span>{tree.postOrder().join(" - ")}</span>
        </div>
      </section>

      <section className="section">
        <h2>Buscar valor en el árbol</h2>
        <div className="search-container">
          <input
            className="search-input"
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Ingresa un número"
          />
          <button className="search-button" onClick={handleSearch}>
            Buscar
          </button>
        </div>
        {searchResult && (
          <p className={`search-result ${isFound ? "found" : "not-found"}`}>
            {searchResult}
          </p>
        )}
      </section>

      <section className="section">
        <h2>Visualización del árbol</h2>
        <p className="visualizer-hint">Puedes hacer zoom y arrastrar el árbol</p>
        <TreeVisualizer data={treeD3Data} />
      </section>
    </div>
  );
}

export default App;