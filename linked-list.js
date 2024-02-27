/* eslint-disable max-classes-per-file */

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor(head) {
    this.head = head;
    this.head.nextNode = null;
  }

  append(value) {
    const node = new Node(value);
    let curr = this.head;
    while (curr.nextNode !== null) {
      curr = curr.nextNode;
    }
    curr.nextNode = node;
  }

  prepend(value) {
    const node = new Node(value, this.head);
    node.nextNode = this.head;
    this.head = node;
  }

  size() {
    let curr = this.head;
    let count = 0;
    while (curr !== null) {
      count += 1;
      curr = curr.nextNode;
    }
    return count;
  }

  head() {
    return this.head;
  }

  tail() {
    let curr = this.head;
    while (curr.nextNode !== null) {
      curr = curr.nextNode;
    }
    return curr;
  }

  at(index) {
    let curr = this.head;
    let count = 0;
    while (count < index) {
      count += 1;
      curr = curr.nextNode;
    }
    return curr;
  }

  pop() {
    if (this.size() === 1) {
      const popped = this.head;
      this.head = null;
      return popped;
    }
    let curr = this.head;
    while (curr.nextNode.nextNode !== null) {
      curr = curr.nextNode;
    }

    const popped = curr.nextNode;
    curr.nextNode = null;
    return popped;
  }

  find(value) {
    let curr = this.head;
    while (curr !== null) {
      if (curr.value === value) {
        return curr;
      }
      curr = curr.nextNode;
    }
    return null;
  }

  toString() {
    let str = '';
    let curr = this.head;
    while (curr !== null) {
      str += `(${curr.value}) -> `;
      curr = curr.nextNode;
    }
    str += ' null';
    return str;
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
    } else {
      const newNode = new Node(value);
      const nodeBeforeInsert = this.at(index - 1);
      const nodeAfterInsert = this.at(index);
      nodeBeforeInsert.nextNode = newNode;
      newNode.nextNode = nodeAfterInsert;
    }
  }

  removeAt(index) {
    if (index === 0) {
      const afterHead = this.head.nextNode;
      this.head.nextNode = null;
      this.head = afterHead;
    }
    const nodeBeforeRemove = this.at(index - 1);
    const nodeAfterRemove = this.at(index + 1);
    nodeBeforeRemove.nextNode = nodeAfterRemove;
    this.at(index).nextNode = null;
  }
}
const node1 = new Node(5);

const ll = new LinkedList(node1);
ll.prepend(10);
ll.append(20);
ll.pop();
ll.append(55);
ll.size();
ll.insertAt(2, 1);
ll.removeAt(2);
console.log(ll.toString());
console.log(ll.size());
