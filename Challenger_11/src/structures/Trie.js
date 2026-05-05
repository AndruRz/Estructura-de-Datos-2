class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.product = null; 
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(name, popularity) {
    let curr = this.root;
    for (let ch of name.toLowerCase()) {
      if (!curr.children[ch]) {
        curr.children[ch] = new TrieNode();
      }
      curr = curr.children[ch];
    }
    curr.isEndOfWord = true;
    curr.product = { name, popularity };
  }

  searchByPrefix(prefix) {
    let curr = this.root;
    for (let ch of prefix.toLowerCase()) {
      if (!curr.children[ch]) return [];
      curr = curr.children[ch];
    }
    return this._collectAll(curr);
  }

  _collectAll(node) {
    const results = [];
    if (node.isEndOfWord) results.push(node.product);
    for (let ch in node.children) {
      results.push(...this._collectAll(node.children[ch]));
    }
    return results;
  }
}

export default Trie;