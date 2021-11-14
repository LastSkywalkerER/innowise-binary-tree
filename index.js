class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    let newNode = new Node(data);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  inOrderTraverse(node = this.root, callback) {
    if (node) {
      this.inOrderTraverse(node.left, callback);
      callback(node.data);
      this.inOrderTraverse(node.right, callback);
    }
  }

  preOrderTraverse(node = this.root, callback) {
    if (node) {
      callback(node.data);
      this.inOrderTraverse(node.left, callback);
      this.inOrderTraverse(node.right, callback);
    }
  }

  postOrderTraverse(node = this.root, callback) {
    if (node) {
      this.inOrderTraverse(node.left, callback);
      this.inOrderTraverse(node.right, callback);
      callback(node.data);
    }
  }

  search(node = this.root, data, callback) {
    callback(node.data);
    if (!node) {
      return null;
    } else if (data < node.data) {
      return this.search(node.left, data, callback);
    } else if (data > node.data) {
      return this.search(node.right, data, callback);
    } else {
      return node;
    }
  }

  minNode(node = this.root, callback) {
    if (callback) {
      callback(node.data);
    }
    if (!node.left) {
      return node;
    } else {
      return this.minNode(node.left, callback);
    }
  }

  maxNode(node = this.root, callback) {
    if (callback) {
      callback(node.data);
    }
    if (!node.right) {
      return node;
    } else {
      return this.maxNode(node.right, callback);
    }
  }

  remove(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node = this.root, data) {
    if (!node) {
      return null;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      //удаляем узел без потомков
      if (!node.left && !node.right) {
        node = null;
        return node;
      }

      //удаляем узел с одним потомком
      if (!node.left) {
        node = node.right;
        return node;
      } else if (!node.right) {
        node = node.left;
        return node;
      }

      //удаляем узел с двумя потомками
      const newNode = this.minNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }
}

const BST = new BinarySearchTree();
BST.insert(11); // establishes root node 
BST.insert(7);
BST.insert(9);
BST.insert(15);
BST.insert(5);
BST.insert(6);
BST.insert(3);
BST.insert(8);
BST.insert(10);
BST.insert(13);
BST.insert(20);
BST.insert(12);
BST.insert(14);
BST.insert(18);
BST.insert(25);
console.log(BST);
let output = '';
const createOutput = (data) => output += ` -> ${data}`;
BST.inOrderTraverse(undefined, createOutput);
console.log(output);
output = '';
BST.preOrderTraverse(undefined, createOutput);
console.log(output);
output = '';
BST.postOrderTraverse(undefined, createOutput);
console.log(output);
output = '';
BST.search(undefined, 10, createOutput);
console.log(output);
output = '';
BST.minNode(undefined, createOutput);
console.log(output);
output = '';
BST.maxNode(undefined, createOutput);
console.log(output);
output = '';
BST.remove(15);
BST.inOrderTraverse(undefined, createOutput);
console.log(output, 'del 15');
output = '';