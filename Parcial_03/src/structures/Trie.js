class TrieNode {
  constructor() {
    this.children = {}; 
    this.isEndOfWord = false; 
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(song) {
    let node = this.root;
    const word = song.toLowerCase(); 

    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }

    node.isEndOfWord = true; 
  }

  search(song) {
    let node = this.root;
    const word = song.toLowerCase();

    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }

    return node.isEndOfWord; 
  }

  startsWith(prefix) {
    let node = this.root;
    const pre = prefix.toLowerCase();

    for (const char of pre) {
      if (!node.children[char]) return []; 
      node = node.children[char];
    }

    const suggestions = [];
    this._collectWords(node, pre, suggestions);
    return suggestions;
  }

  _collectWords(node, current, results) {
    if (node.isEndOfWord) {
      results.push(current); 
    }

    for (const char in node.children) {
      this._collectWords(node.children[char], current + char, results);
    }
  }
}

export default Trie;
