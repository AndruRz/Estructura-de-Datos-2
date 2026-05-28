import { useMemo } from "react";
import "./Ranking.css";

function Ranking({ heap, version }) {
  const topSongs = useMemo(() => heap.getTop(10), [heap, version]);

  return (
    <div className="ranking-container">
      <h2>Top 10 Canciones</h2>

      <ul className="ranking-list">
        {topSongs.map((song, index) => (
          <li key={index} className={`ranking-item ranking-item--${index + 1}`}>
            <span className="ranking-position">#{index + 1}</span>
            <span className="ranking-title">{song.title}</span>
            <span className="ranking-plays">{song.plays.toLocaleString()} plays</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;