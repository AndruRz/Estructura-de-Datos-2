import SearchBar       from "../SearchBar/SearchBar";
import Ranking         from "../Ranking/Ranking";
import Recommendations from "../Recommendations/Recommendations";
import "./Dashboard.css";

function Dashboard({ trie, heap, graph, version, onSongInserted }) {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>ShafaFy Educativo</h1>
        <p>Plataforma de música con estructuras de datos</p>
      </header>

      <main className="dashboard-grid">
        <section className="dashboard-section dashboard-section--search">
          <SearchBar trie={trie} heap={heap} graph={graph} onSongInserted={onSongInserted} />
        </section>

        <section className="dashboard-section dashboard-section--ranking">
          <Ranking heap={heap} version={version} />
        </section>

        <section className="dashboard-section dashboard-section--recommendations">
          <Recommendations graph={graph} version={version} />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;