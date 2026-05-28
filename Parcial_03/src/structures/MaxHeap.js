
class MaxHeap {
  constructor() {
    this.heap = []; 
  }

  _parentIndex(i)    { return Math.floor((i - 1) / 2); }
  _leftChildIndex(i) { return 2 * i + 1; }
  _rightChildIndex(i){ return 2 * i + 2; }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(title, plays) {
    const song = { title, plays };
    this.heap.push(song);
    this._bubbleUp(); 
  }

  _bubbleUp() {
    let i = this.heap.length - 1;

    while (i > 0) {
      const parent = this._parentIndex(i);

      if (this.heap[i].plays > this.heap[parent].plays) {
        this._swap(i, parent);
        i = parent;
      } else {
        break;
      }
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return max;
  }

  _bubbleDown(i) {
    const length = this.heap.length;

    while (true) {
      let largest = i;
      const left  = this._leftChildIndex(i);
      const right = this._rightChildIndex(i);

      if (left < length && this.heap[left].plays > this.heap[largest].plays) {
        largest = left;
      }

      if (right < length && this.heap[right].plays > this.heap[largest].plays) {
        largest = right;
      }

      if (largest !== i) {
        this._swap(i, largest);
        i = largest;
      } else {
        break;
      }
    }
  }

  getTop(n) {
    const tempHeap = new MaxHeap();
    tempHeap.heap = [...this.heap];

    const result = [];
    const count  = Math.min(n, tempHeap.heap.length);

    for (let i = 0; i < count; i++) {
      result.push(tempHeap.extractMax());
    }

    return result;
  }


  peek() {
    return this.heap[0] || null;
  }

  size() {
    return this.heap.length;
  }
}

export default MaxHeap;
