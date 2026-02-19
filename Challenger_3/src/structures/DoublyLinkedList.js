class Node {
  constructor(value) {
    this.value = value;  
    this.next = null;    
    this.prev = null;  
  }
}

class DoublyLinkedList {
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
    newNode.prev = this.tail; 
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
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current === this.head) {
          this.head = current.next;
          if (this.head) this.head.prev = null;
        }
        if (current === this.tail) {
          this.tail = current.prev;
          if (this.tail) this.tail.next = null;
        }
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;
        this.length--;
        return;
      }
      current = current.next;
    }
  }

  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.value.url + " <-> ";
      current = current.next;
    }
    console.log(result + "null");
  }
}

export default DoublyLinkedList;