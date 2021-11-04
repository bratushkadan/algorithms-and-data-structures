class BinaryTreeNode<T> {
    readonly value: T;
    left: BinaryTreeNode<T> | null = null;
    right: BinaryTreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

type TraverseCallback<T> = (value: BinaryTreeNode<T>) => void;

class BinaryTree<T> {
    private _root: BinaryTreeNode<T> | null = null;
    
    constructor(root: BinaryTreeNode<T>) {
        this._root = root;
    }

    preOrderTraverseIterative(fn: TraverseCallback<T>): void {
        let nodeStack = [];
        nodeStack.push(this._root);

        while (nodeStack.length) {
            let node = nodeStack.pop();
            fn(node);

            node.right && nodeStack.push(node.right);
            node.left && nodeStack.push(node.left);
        }
    }

    preOrderTraverse(fn: TraverseCallback<T>): void {
        this._traversePreOrderHelper(this._root, fn);    
    }

    inOrderTraverse(fn: TraverseCallback<T>): void {
        this._traverseInOrderHelper(this._root, fn);
    }

    postOrderTraverse(fn: TraverseCallback<T>): void {
        this._traversePostOrderHelper(this._root, fn);
    }

    breadthFirstSearch(fn: TraverseCallback<T>): void {
        this.postOrderTraverse(fn);
    }

    levelOrderTraverse(fn: TraverseCallback<T>): void {
        this._traverseLevelOrderHelper(this._root, fn)
    }

    private _traversePreOrderHelper(node: BinaryTreeNode<T>, fn: TraverseCallback<T>): void {
        if (!node) return;
        
        fn(node);
        this._traversePreOrderHelper(node.left, fn);
        this._traversePreOrderHelper(node.right, fn);
    }

    private _traverseInOrderHelper(node: BinaryTreeNode<T>, fn: TraverseCallback<T>): void {
        if (!node) return;
        
        this._traverseInOrderHelper(node.left, fn);
        fn(node);
        this._traverseInOrderHelper(node.right, fn);
    }

    private _traversePostOrderHelper(node: BinaryTreeNode<T>, fn: TraverseCallback<T>): void {
        if (!node) return;
        
        this._traversePostOrderHelper(node.left, fn);
        this._traversePostOrderHelper(node.right, fn);
        fn(node);
    }
    
    private _traverseLevelOrderHelper(node: BinaryTreeNode<T>, fn: TraverseCallback<T>): void {
        if (!node) return;
        if (!this._root) return;

        let queue = [this._root];
        
        while(queue.length) {
            let temp = queue.shift();
            fn(node);
            if (temp.left) queue.push(temp.left);
            if (temp.right) queue.push(temp.right);
        }
    }
}

const bst = new BinaryTree(new BinaryTreeNode(42));
// @ts-ignore
bst._root.left =  (() => {
    let node = new BinaryTreeNode(41);
    node.left = new BinaryTreeNode(10);
    node.right = new BinaryTreeNode(40);
    return node;
})();
// @ts-ignore
bst._root.right =  (() => {
    let node = new BinaryTreeNode(50);
    node.left = new BinaryTreeNode(45);
    node.right = new BinaryTreeNode(75);
    return node;
})();

bst.breadthFirstSearch(node => console.log(node.value));