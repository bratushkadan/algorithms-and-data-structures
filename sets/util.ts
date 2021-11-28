function intersect(s1: Set<unknown>, s2: Set<unknown>) {
    const intersection = new Set();
    for (const elem of s1) {
        if (s2.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}

function isSuperSet(set: Set<unknown>, subset: Set<unknown>) {
    for (const elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

function unionSet(s1: Set<unknown>, s2: Set<unknown>) {
    const union = new Set(s1);
    for (const elem of s2) {
        union.add(elem);
    }
    return union;
}

function difference(s1: Set<unknown>, s2: Set<unknown>) {
    const diff = new Set(s1);
    for (const elem of s2) {
        diff.delete(elem);
    }
    return diff;
}