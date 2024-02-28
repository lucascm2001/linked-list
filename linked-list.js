/* eslint-disable max-classes-per-file */

export class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  constructor(head) {
    this.head = head;
    if (head !== null) {
      this.head.nextNode = null;
    }
  }

  append(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.nextNode !== null) {
        curr = curr.nextNode;
      }
      curr.nextNode = node;
    }
  }

  prepend(value) {
    const node = new Node(value, this.head);
    node.nextNode = this.head;
    this.head = node;
  }

  size() {
    if (this.head === null) return 0;
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
      if (typeof curr === 'object') { // for hash-map
        if (curr.value.key === value) {
          return curr;
        }
      } else if (curr.value === value) {
        return curr;
      }
      curr = curr.nextNode;
    }
    return null;
  }

  index(value) {
    let curr = this.head;
    let count = 0;
    while (curr !== null) {
      if (typeof curr === 'object') { // for hash-map
        if (curr.value.key === value) {
          return count;
        }
      } else if (curr.value === value) {
        return count;
      }
      curr = curr.nextNode;
      count += 1;
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
    } else if (index === this.size() - 1) {
      this.pop();
    } else {
      const nodeBeforeRemove = this.at(index - 1);
      const nodeAfterRemove = this.at(index + 1);
      nodeBeforeRemove.nextNode = nodeAfterRemove;
      this.at(index).nextNode = null;
    }
  }
}
