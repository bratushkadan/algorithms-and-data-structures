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

function depthFirstSearch(root, target) {
    if (!root) {
        return null;
    }
    if (root.value === target) {
        return root;
    }
    return depthFirstSearch(root.left, target) || depthFirstSearch(root.right, target);
}

function searchTreeMinimum(root, min) {
    if (!root) {
        return min;
    }
    return Math.min(searchTreeMinimum(root.left, root.value), searchTreeMinimum(root.right, root.value));
}

function treeDepth(node) {
    if (!node) {
        return 0;
    }
    return 1 + Math.max(treeDepth(node.left), treeDepth(node.right));
}

/* see https://github.com/bratushkadan/algorthims-DS/blob/master/trees/README.md */
function visibleTreeNode(root, prev = -Infinity) {
    if (!root) {
        return 0;
    }
    let visible = 0;
    if (root.value >= prev) {
        prev = root.value;
        visible++;
    }
    return visible + visibleTreeNode(root.left, prev) + visibleTreeNode(root.right, prev);
}

function isBalanced(tree) {
    if (!tree) {
        return true;
    }
    if (tree.left && tree.right) {
        return Math.abs(treeDepth(tree.left) - treeDepth(tree.right)) <= 1 && isBalanced(tree.left) && isBalanced(tree.right);
    }
    return Math.abs(treeDepth(tree.left) - treeDepth(tree.right)) <= 1;
}

function serializeDfs(root) {  
    if (!root) {
        return ' x';
    }
    return ` ${root.value}` + ' ' + serializeTree(root.left) + ' ' + serializeTree(root.right);
}

function serializeTree(root) {
    return serializeDfs(root).trimStart();
}

let deserializeNode = entry => entry === 'x' ? null : new BinaryTreeNode(Number(entry));

function deserializeDfs(nodes) {
    const entry = deserializeNode(nodes.shift());
    if (!entry) {
        return null;
    }
    entry.left = deserializeDfs(nodes);
    entry.right = deserializeDfs(nodes);
    return entry;
}

function deserializeTree(s) {
    return deserializeDfs(s.split(" "));
}

function lca(root, node1, node2) {
    if (!root) {
        return null;
    }
    if (root === node1 || root == node2) {
        return root;
    }

    const left = lowestCommonAncestor(root.left, node1, node2);
    const right = lowestCommonAncestor(root.right, node1, node2);

    if (left && right) {
        return root;
    }
    if (left) return left;
    return right;
}
/* check if node1 and node2 exist in a tree */
function lowestCommonAncestor(tree, node1, node2) {
    if (depthFirstSearch(tree, node1.val), depthFirstSearch(tree, node2.val)) {
        return lca(tree, node1, node2);
    }
    return null;
}

function treeSize(root) {
    if (!root) {
        return 0;
    }
    return treeSize(root.left) + treeSize(root.right) + 1;
}

function kSmallest(root, k) {
    if (!root) {
        return null;
    }
    if (k < 1) {
        return null;
    }
    const m = treeSize(root.left);
    if (m + 1 === k) {
        return root;
    }
    if (m >= k) {
        return kSmallest(root.left, k);
    }
    return kSmallest(root.right, k - m - 1);
}

function appendChild(to, child) {
    child && to.push(child);
}

function levelOrder(root): number[][] {
    const traversal = [];
    let ancestors = root ? [root] : [];
    let children = [];
    while (ancestors.length) {
        const traversalEntry = [];
        ancestors.forEach(ancestor => {
            traversalEntry.push(ancestor.val);
            appendChild(children, ancestor.left);
            appendChild(children, ancestor.right);
        });
        traversal.push(traversalEntry);
        ancestors = children;
        children = [];
    }
    return traversal;
}

function levelOrderTraverse(root) {
    if (!root) {
        return [];
    }
    const traversal = [root.val];
    const stack = [root];
    while (stack.length) {
        const head = stack.shift();
        if (head.left) {
            traversal.push(head.left.val);
            stack.push(head.left);
        }
        if (head.right) {
            traversal.push(head.right.val);
            stack.push(head.right);
        }
    }
    return traversal;
}

const preorderTraversal = root => !root ? [] : [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)];
const inorderTraversal = root => !root ? [] : [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)];
const postorderTraversal = root => !root ? [] : [...postorderTraversal(root.left), ...postorderTraversal(root.right), root.val];

const bst = new BinaryTree(new BinaryTreeNode(42));
// @ts-ignore
bst._root.left = (() => {
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
