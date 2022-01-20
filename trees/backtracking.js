function Node(val) {
    this.val = val;
    this.children = [];
}

/*
// Example for ternaryTreePaths
let tree = (() => {
    let node = new Node(1);
    node.children.push(new Node(2), new Node(4), new Node(6));
    node.children[0].children.push(new Node(3));
    return node;
})();
*/

function ternaryTreePaths(tree) {
    const path = [];

    function ttp(tree) {
        if (!tree) {
            return [];
        }
        path.push(tree.val);
        let pth = path.join('->');
        if (tree.children.some(node => node)) {
            const res = tree.children.map(node => ttp(node).flat(1));
            path.pop();
            return res;
        }
        path.pop();
        return [pth];
    }
    return ttp(tree);
}
ternaryTreePaths(tree);
