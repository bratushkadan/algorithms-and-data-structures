class BinarySearchTreeNode<T> {
    private readonly _value: T;
    left: BinarySearchTreeNode<T> | null = null;
    right: BinarySearchTreeNode<T> | null = null;

    constructor(value: T) {
        this._value = value;
    }

    get value() {
        return this._value;
    }
}

class BinarySearchTree<T> {
    private _root: BinarySearchTreeNode<T> | null = null;

    constructor(root: BinarySearchTreeNode<T> | T) {
        if (root instanceof BinarySearchTreeNode) {
            this._root = root;
        }
    }

    insert(value: T): void {
        this._insertHelper(value, this.root);
    }

    private _insertHelper(value: T, node: BinarySearchTreeNode<T>) {
        if (node.value > value) {
            if (node.left) {
                this._insertHelper(value, node.left);
            } else {
                node.left = new BinarySearchTreeNode(value);
            }
        } else {
            if (node.right) {
                this._insertHelper(value, node.right);
            } else {
                node.right = new BinarySearchTreeNode(value);
            }
        }
    }

    get root() {
        return this._root;
    }
}

let BST = new BinarySearchTree(10);
BST.insert(15);
BST.insert(17);
BST.insert(12);
BST.insert(5);
BST.insert(2);
BST.insert(3);
console.log(BST);