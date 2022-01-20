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
        if (tree.children.length) {
            const res = tree.children.map(child => ttp(child)).flat(1);
            path.pop();
            return res;
        }
        const pth = path.join('->');
        path.pop();
        return [pth];
    }
    
    return ttp(tree);
}
ternaryTreePaths(tree);

function permutations(collection) {
    const result = [];
    const state = [];

    function perms(elements) {
        if (!elements.length && state.length) {
            result.push(state.slice());
        }

        for (let i = 0; i < elements.length; i++) {
            state.push(elements[i]);
            perms(elements.slice(0, i).concat(elements.slice(i + 1)));
            state.pop();
        }
    }

    perms(collection.slice())
    return result;
}
