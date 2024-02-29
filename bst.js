/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function buildTree(array) {
  if (array.length === 0) return null;
  if (array.length === 1) {
    return new Node(array[0]);
  }

  const newArray = [...new Set(array)].toSorted((a, b) => a - b);
  const mid = Math.floor(newArray.length / 2);
  const root = new Node(newArray[mid]);

  const leftArr = newArray.slice(0, mid);
  const rightArr = newArray.slice(mid + 1);

  root.left = buildTree(leftArr);
  root.right = buildTree(rightArr);
  return root;
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value) {
    let prev = null;
    let node = this.root;
    let flag = 1;
    const newNode = new Node(value);
    while (node !== null) {
      if (value < node.value) {
        prev = node;
        node = node.left;
      } else if (value > node.value) {
        prev = node;
        node = node.right;
      } else {
        flag = 0;
        break;
      }
    }
    if (flag) {
      if (prev.value > value) prev.left = newNode;
      else prev.right = newNode;
    }
  }

  deleteItem(value) {
    let prev = null;
    let node = this.root;
    const flag = 1;
    while (node !== null) {
      if (value < node.value) {
        prev = node;
        node = node.left;
      } else if (value > node.value) {
        prev = node;
        node = node.right;
      } /* else

      if (node.left === null && node.right === null) { // no children
        prev.left = null;
        prev.right = null;
      } else if (node.left !== null && node.right === null) { // left child
        const child = node.left;
        const newPrev = prev.left.value === node.value ? prev.left = child : prev.right = child;
      } else if (node.left === null && node.right !== null) {

      } */
    }
  }

  find(value) {
    let node = this.root;
    while (node.value !== value) {
      if (value < node.value) {
        node = node.left;
      } else if (value > node.value) {
        node = node.right;
      }
    }
    return node;
  }

  levelOrder(callback = null) {
    // breadth-first traversal
    let node = this.root;
    const queue = [node];
    const result = [];
    while (queue.length !== 0) {
      // read last element, unshift its children repeat
      // if (node !== null) {
      if (callback === null) {
        result.push(node.value);
      } else callback(node);
      if (node.left !== null) queue.unshift(node.left);
      if (node.right !== null) queue.unshift(node.right);
      queue.pop();
      node = queue[queue.length - 1];
    }
    if (callback === null) return result;
    return undefined;
  }

  inOrder(callback = null) {
    // left, root, right
    let node = this.root;
    const stack = [];
    const result = [];

    while (stack.length !== 0 || node !== null) {
      if (node !== null) {
        stack.push(node);
        node = node.left;
      } else {
        node = stack[stack.length - 1];
        stack.pop();
        if (callback === null) result.push(node.value);
        else callback(node);
        node = node.right;
      }
    }
    if (callback === null) return result;
    return undefined;
  }

  preOrder(callback = null) {
    // root, left, right
    let node = this.root;
    const stack = [node];
    const result = [];

    while (stack.length !== 0) {
      if (callback === null) result.push(node.value);
      else callback(node);
      stack.pop();

      if (node.right !== null) stack.push(node.right);
      if (node.left !== null) stack.push(node.left);

      node = stack[stack.length - 1];
    }
    if (callback === null) return result;
    return undefined;
  }

  postOrder(callback = null) {
    // left, right, root
    let node = this.root;
    if (!node) return [];

    const stack = [];
    const result = [];
    let prev = null;

    while (stack.length !== 0 || node !== null) {
      while (node !== null) {
        stack.push(node);
        node = node.left;
      }

      node = stack[stack.length - 1];
      if (node.right !== null && node.right !== prev) {
        node = node.right;
      } else {
        result.push(node.value);
        prev = node;
        stack.pop();
        node = null;
      }
    }
    return result;
  }

  height(node) {
    if (node === null) return -1;
    return Math.max(1 + this.height(node.left), 1 + this.height(node.right));
  }

  depth(node) {
    let curr = this.root;
    let count = 0;

    while (curr.value !== node.value) {
      if (curr.value < node.value) {
        curr = curr.right;
      } else if (curr.value > node.value) {
        curr = curr.left;
      }
      count += 1;
    }
    return count;
  }

  isBalanced() {
    const leftHeight = this.height(this.root.left);
    const rightHeight = this.height(this.root.right);

    if (Math.abs(rightHeight - leftHeight) <= 1) return true;
    return false;
  }

  rebalance() {
    const treeArray = this.inOrder();
    this.root = buildTree(treeArray);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const array = Array(20).fill().map(() => Math.floor(Math.random() * 100));
const tree = new Tree(array);
console.log(prettyPrint(tree.root));
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
tree.insert(101);
tree.insert(104);
tree.insert(105);
tree.insert(102);
console.log(tree.isBalanced());
console.log(tree.rebalance());
console.log(prettyPrint(tree.root));
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());

// const tree = new Tree(buildTree(array));

// prettyPrint(tree.root);
