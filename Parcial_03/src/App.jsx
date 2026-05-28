import { useMemo, useState, useCallback } from "react";
import Trie      from "./structures/Trie";
import MaxHeap   from "./structures/MaxHeap";
import Graph     from "./structures/Graph";
import Dashboard from "./components/Dashboard/Dashboard";
import { initialSongs, initialRelations } from "./data/songs";
import "./App.css";

function App() {
  const [version, setVersion] = useState(0);

  const { trie, heap, graph } = useMemo(() => {
    const trie  = new Trie();
    const heap  = new MaxHeap();
    const graph = new Graph();

    initialSongs.forEach(({ title, plays }) => {
      trie.insert(title);
      heap.insert(title, plays);
      graph.addSong(title);
    });

    initialRelations.forEach(([song1, song2]) => {
      graph.addRelation(song1, song2);
    });

    return { trie, heap, graph };
  }, []);

  const onSongInserted = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  return (
    <Dashboard
      trie={trie}
      heap={heap}
      graph={graph}
      version={version}
      onSongInserted={onSongInserted}
    />
  );
}

export default App;