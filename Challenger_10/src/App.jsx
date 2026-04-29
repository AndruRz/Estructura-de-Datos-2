import { useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import Graph from "./graph/Graph";
import Person from "./graph/Person";
import City from "./graph/City";
import "./App.css";

const myGraph = new Graph();

[new City("Cali"), new City("Bogotá"), new City("Medellín")].forEach((c) =>
  myGraph.addNode(c)
);

[
  new Person("Andre",   22, "Cali"),
  new Person("Juan",    25, "Bogotá"),
  new Person("Daniel",  30, "Cali"),
  new Person("Freddy",  28, "Medellín"),
  new Person("Dariana", 21, "Bogotá"),
  new Person("Pedro",   35, "Medellín"),
].forEach((p) => {
  myGraph.addNode(p);
  myGraph.addEdge(p.name, p.city);
});

const graphData = {
  nodes: myGraph.nodes.map((n) => ({
    id: n.name,
    type: n.type,
    age: n.type === "person" ? n.age : null,
    city: n.type === "person" ? n.city : null,
  })),
  links: myGraph.nodes
    .filter((n) => n.type === "person")
    .map((p) => ({ source: p.name, target: p.city })),
};

function App() {
  const [selectedCity, setSelectedCity] = useState("");

  const cities = myGraph.nodes.filter((n) => n.type === "city");
  const filtered = selectedCity ? myGraph.getPeopleByCity(selectedCity) : [];

  return (
    <div className="container">
      <h1>Challenge 10 — Grafo de Amigos y Ciudades</h1>

      <div className="legend">
        <span><span className="dot-city">●</span> Ciudad</span>
        <span><span className="dot-person">●</span> Persona</span>
      </div>

      <div className="graph-container">
        <ForceGraph2D
          graphData={graphData}
          width={850}
          height={450}
          nodeLabel={(node) =>
            node.type === "person"
              ? `${node.id} (${node.age} años) — ${node.city}`
              : `Ciudad: ${node.id}`
          }
          nodeColor={(node) => node.type === "city" ? "#00bcd4" : "#ff9800"}
          nodeRelSize={8}
          linkColor={() => "#ffffff44"}
          linkWidth={2}
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 14 / globalScale;
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(label, node.x, node.y + 12 / globalScale);
          }}
        />
      </div>

      <div className="filter-section">
        <h2>Personas por ciudad</h2>
        <select onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">-- Selecciona una ciudad --</option>
          {cities.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>

        {filtered.length > 0 && (
          <ul>
            {filtered.map((p) => (
              <li key={p.name}>
                <strong>{p.name}</strong> — {p.age} años
              </li>
            ))}
          </ul>
        )}

        {selectedCity && filtered.length === 0 && (
          <p className="empty-msg">No hay personas en esta ciudad.</p>
        )}
      </div>
    </div>
  );
}

export default App;