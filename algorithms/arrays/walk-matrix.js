const matrix = [
    [0, 1, 2, 3],
    [11, 12, 13, 4],
    [10, 15, 14, 5],
    [9, 8, 7, 6],
];
const matrix2 = [
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]
];
const matrix3 = [
    [1, 2],
    [4, 3]
];

const matrix4 = [
    [1]
];

const matrix5 = [
    [1, 2, 3, 4, 5],
    [10, 9, 8, 7, 6]
];

const matrix6 = [
    [1, 2],
    [10, 3],
    [9, 4],
    [8, 5],
    [7, 6]
];

const walkMatrix = matrix => {
    const flat = [];
    let [up, bot, l, r] = [0, matrix.length - 1, 0, matrix[0].length - 1];
    while (up <= bot && l <= r) {
        for (let i = l; i <= r; i++) {
            flat.push(matrix[up][i]);
        }
        if (up <= bot) {
            up++;
        }
        for (let i = up; i <= bot; i++) {
            flat.push(matrix[i][r]);
        }
        if (r >= l) {
            r--;
        }
        for (let i = r; i >= l; i--) {
            flat.push(matrix[bot][i]);
        }
        if (bot >= up) {
            bot--;
        }
        for (let i = bot; i >= up; i--) {
            flat.push(matrix[i][l]);
        }
        if (l <= r) {
            l++;
        }
    }
    return flat;
}

console.log(walkMatrix(matrix));
console.log(walkMatrix(matrix2));
console.log(walkMatrix(matrix3));
console.log(walkMatrix(matrix4));
console.log(walkMatrix(matrix5));
console.log(walkMatrix(matrix6));
