import { useState } from "react";
import LinkedList from "../structures/LinkedList";
import songs from "../data/songs";
import "./SongPlayer.css";

const SongPlayer = () => {
  const [list] = useState(() => {
    const ll = new LinkedList();
    songs.forEach((song) => ll.append(song));
    return ll;
  });

  const [currentNode, setCurrentNode] = useState(list.head);
  const [index, setIndex] = useState(1);

  const handleNext = () => {
    if (currentNode.next) {
      setCurrentNode(currentNode.next);
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="player-container">
      <h1 className="player-title">Ghost Player</h1>
      <p className="player-subtitle">LINKED LIST — SOLO AVANZA</p>

      {currentNode && (
        <div className="song-card">
          <div className="song-icon">🎵</div>
          <h2 className="song-name">{currentNode.value.title}</h2>
          <p className="song-artist">{currentNode.value.artist}</p>
          <span className="song-duration">⏱ {currentNode.value.duration}</span>
        </div>
      )}

      <div className="player-controls">
        <button className="btn-next" onClick={handleNext} disabled={!currentNode?.next}>
          Siguiente ⏭
        </button>
      </div>

      <p className="song-counter">Canción {index} de {songs.length}</p>
    </div>
  );
};

export default SongPlayer;