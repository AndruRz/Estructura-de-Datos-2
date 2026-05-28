import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./Recommendations.css";

function Recommendations({ graph }) {
  const allSongs                  = graph.getAllSongs();
  const [clicked, setClicked]     = useState(null);
  const [related, setRelated]     = useState([]);
  const [selectVal, setSelectVal] = useState("");
  const svgRef                    = useRef(null);
  const simulationRef             = useRef(null);
  const nodeRef                   = useRef(null);
  const linkRef                   = useRef(null);

  const highlightNode = (songId) => {
    if (!nodeRef.current || !linkRef.current) return;
    const neighbors = songId ? graph.getRecommendations(songId) : [];

    nodeRef.current.select("circle")
      .attr("r",            (n) => n.id === songId ? 18 : neighbors.includes(n.id) ? 13 : 9)
      .attr("fill",         (n) => n.id === songId ? "#1DB954" : neighbors.includes(n.id) ? "#158a3e" : "#282828")
      .attr("stroke",       (n) => n.id === songId ? "#fff"    : neighbors.includes(n.id) ? "#1DB954" : "#444")
      .attr("stroke-width", (n) => n.id === songId ? 2.5 : neighbors.includes(n.id) ? 1.5 : 0.5);

    nodeRef.current.select("text")
      .attr("fill",        (n) => n.id === songId ? "#fff" : neighbors.includes(n.id) ? "#1DB954" : "#666")
      .attr("font-weight", (n) => n.id === songId ? "700"  : neighbors.includes(n.id) ? "600" : "400")
      .attr("font-size",   (n) => n.id === songId ? "11px" : neighbors.includes(n.id) ? "10px" : "9px");

    linkRef.current
      .attr("stroke",       (l) => l.source.id === songId || l.target.id === songId ? "#1DB954" : "#2a2a2a")
      .attr("stroke-width", (l) => l.source.id === songId || l.target.id === songId ? 2 : 1);
  };

  const handleSelect = (e) => {
    const val = e.target.value;
    setSelectVal(val);
    if (val === "") {
      setClicked(null);
      setRelated([]);
      highlightNode(null);
    } else {
      setClicked(val);
      setRelated(graph.getRecommendations(val));
      highlightNode(val);
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();
    if (simulationRef.current) simulationRef.current.stop();

    const songs    = graph.getAllSongs();
    const nodes    = songs.map((id) => ({ id }));
    const linksSet = new Set();
    const links    = [];

    songs.forEach((song) => {
      graph.getRecommendations(song).forEach((neighbor) => {
        const key = [song, neighbor].sort().join("||");
        if (!linksSet.has(key)) {
          linksSet.add(key);
          links.push({ source: song, target: neighbor });
        }
      });
    });

    const width  = svgRef.current.clientWidth || 700;
    const height = 440;

    const svg = d3.select(svgRef.current)
      .attr("width",  width)
      .attr("height", height);

    svg.append("rect")
      .attr("width",  width)
      .attr("height", height)
      .attr("fill",   "#0f0f0f")
      .attr("rx", 12);

    const container = svg.append("g").attr("class", "zoom-container");

    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => container.attr("transform", event.transform));

    svg.call(zoom);

    svg.append("text")
      .attr("x", 12)
      .attr("y", height - 12)
      .attr("fill", "#535353")
      .attr("font-size", "10px")
      .attr("font-family", "DM Sans, sans-serif")
      .text("🖱 Scroll para zoom · Arrastra el fondo para mover · Click en nodo para ver relaciones");

    const simulation = d3.forceSimulation(nodes)
      .force("link",      d3.forceLink(links).id((d) => d.id).distance(120))
      .force("charge",    d3.forceManyBody().strength(-320))
      .force("center",    d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(44));

    simulationRef.current = simulation;

    const link = container.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke",         "#2a2a2a")
      .attr("stroke-width",   1)
      .attr("stroke-opacity", 0.9);

    linkRef.current = link;

    const node = container.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        event.stopPropagation();
        const neighbors = graph.getRecommendations(d.id);
        setClicked(d.id);
        setRelated(neighbors);
        setSelectVal(d.id);
        highlightNode(d.id);
      })
      .call(
        d3.drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on("drag",  (event, d) => { d.fx = event.x; d.fy = event.y; })
          .on("end",   (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
      );

    nodeRef.current = node;

    svg.on("click", () => {
      setClicked(null);
      setRelated([]);
      setSelectVal("");
      highlightNode(null);
    });

    node.append("circle")
      .attr("r",            9)
      .attr("fill",         "#282828")
      .attr("stroke",       "#1DB954")
      .attr("stroke-width", 0.5);

    node.append("text")
      .text((d) => d.id.length > 13 ? d.id.slice(0, 12) + "…" : d.id)
      .attr("x", 0)
      .attr("y", 21)
      .attr("text-anchor",   "middle")
      .attr("fill",          "#b3b3b3")
      .attr("font-size",     "9px")
      .attr("font-family",   "DM Sans, sans-serif")
      .attr("font-weight",   "400")
      .attr("pointer-events","none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x).attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x).attr("y2", (d) => d.target.y);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [graph]);

  return (
    <div className="recommendations-container">
      <h2>🎵 Grafo de Canciones Relacionadas</h2>

      <select value={selectVal} onChange={handleSelect}>
        <option value="">Selecciona una canción...</option>
        {allSongs.map((song, i) => (
          <option key={i} value={song}>{song}</option>
        ))}
      </select>

      <div className="recommendations-graph">
        <svg ref={svgRef} style={{ width: "100%", display: "block" }} />
      </div>

      <div className={`recommendations-info ${clicked ? "is-active" : ""}`}>
        {clicked ? (
          <>
            <p className="info-title">
              <span className="info-dot" />
              {clicked}
            </p>
            {related.length > 0 ? (
              <ul className="info-list">
                {related.map((song, i) => (
                  <li key={i}>
                    <span className="info-icon">♫</span>
                    {song}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="info-empty">Sin canciones relacionadas.</p>
            )}
          </>
        ) : (
          <p className="info-placeholder">
            Selecciona una canción o haz click en un nodo del grafo
          </p>
        )}
      </div>
    </div>
  );
}

export default Recommendations;