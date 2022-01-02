function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function isBstValid(root, minval = -Infinity, maxval = Infinity) {
    if (!root) {
        return true;
    }
    if (root.val < minval || root.val > maxval) {
        return false;
    }
    return isBstValid(root.left, minval, root.val) && isBstValid(root.right, root.val, maxval);
}

function insertBst(root, val) {
    if (root.val === val) {
        return false;
    }
    if (root.val > val) {
        if (root.left) {
            return insertBst(root.left, val);
        }
        root.left = new TreeNode(val);
        return true;
    }
    if (root.right) {
        return insertBst(root.right, val);
    }
    root.right = new TreeNode(val);
    return true;
}

function invertBst(root) {
    if (!root) {
        return null;
    }
    [root.left, root.right] = [root.right, root.left];
    invertBst(root.left);
    invertBst(root.right);
    return root;
}