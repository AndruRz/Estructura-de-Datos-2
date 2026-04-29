class Graph {
  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjList[node.name] = [];
  }

  addEdge(node1Name, node2Name) {
    this.adjList[node1Name].push(node2Name);
    this.adjList[node2Name].push(node1Name);
  }

  getPeopleByCity(cityName) {
    return this.nodes.filter(
      (n) => n.type === "person" && n.city === cityName
    );
  }
}

export default Graph;