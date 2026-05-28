class Graph {
  constructor() {
    // Map<string, Set<string>>
    // Clave: título de la canción
    // Valor: Set con las canciones relacionadas
    this.adjacencyList = new Map();
  }

  addSong(song) {
    if (!this.adjacencyList.has(song)) {
      this.adjacencyList.set(song, new Set());
    }
  }

  addRelation(song1, song2) {
    this.addSong(song1);
    this.addSong(song2);
    this.adjacencyList.get(song1).add(song2);
    this.adjacencyList.get(song2).add(song1);
  }

  getRecommendations(song) {
    if (!this.adjacencyList.has(song)) return [];
    return Array.from(this.adjacencyList.get(song));
  }

  removeRelation(song1, song2) {
    if (this.adjacencyList.has(song1)) {
      this.adjacencyList.get(song1).delete(song2);
    }
    if (this.adjacencyList.has(song2)) {
      this.adjacencyList.get(song2).delete(song1);
    }
  }

  hasRelation(song1, song2) {
    if (!this.adjacencyList.has(song1)) return false;
    return this.adjacencyList.get(song1).has(song2);
  }

  getAllSongs() {
    return Array.from(this.adjacencyList.keys());
  }

  getExtendedRecommendations(startSong, maxDepth = 2) {
    if (!this.adjacencyList.has(startSong)) return [];

    const visited = new Set();
    const queue   = [{ song: startSong, depth: 0 }];
    const result  = [];

    visited.add(startSong);

    while (queue.length > 0) {
      const { song, depth } = queue.shift();

      if (depth > 0) result.push(song);
      if (depth >= maxDepth) continue;

      for (const neighbor of this.adjacencyList.get(song)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push({ song: neighbor, depth: depth + 1 });
        }
      }
    }

    return result;
  }
}

export default Graph;
