class Node {
  constructor(value) {
    this.value = value;  
    this.next = null;   
  }
}

class LinkedList {
  constructor() {
    this.head = null;   
    this.tail = null;  
    this.length = 0;   
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  size() {
    return this.length;
  }

  peek(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  remove(value) {
    if (!this.head) return null;
    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return;
    }
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (current.next) {
      if (!current.next.next) this.tail = current;
      current.next = current.next.next;
      this.length--;
    }
  }

  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.value.title + " -> ";
      current = current.next;
    }
    console.log(result + "null");
  }
}

export default LinkedList;