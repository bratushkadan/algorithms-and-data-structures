function canPartition(arr) {
    const sum = arr.reduce((prev, cur) => prev + cur, 0);
    const target = sum / 2;
    if (target % 1) {
        return false;
    }

    const rests = new Array(target + 1).fill(false);
    rests[0] = true;

    for (let el of arr) {
        for (let i = target; 0 <= i; i--) {
            const complement = i - el;

            rests[i] |= Boolean(!rests[i] && rests[complement]);

            if (rests[target]) {
                return true;
            }
        }
    }

    return false;
}
