import Trie from './Trie';
import MinHeap from './MinHeap';

class SearchEngine {
  constructor() {
    this.trie = new Trie();
  }

  insert(name, popularity) {
    this.trie.insert(name, popularity);
  }

  searchTopK(prefix, k) {
    const matches = this.trie.searchByPrefix(prefix);

    const heap = new MinHeap();

    for (let product of matches) {
      heap.push(product);
      if (heap.size() > k) {
        heap.pop(); 
      }
    }
    
    const result = [];
    while (heap.size() > 0) {
      result.unshift(heap.pop());
    }

    return result;
  }
}

export default SearchEngine;