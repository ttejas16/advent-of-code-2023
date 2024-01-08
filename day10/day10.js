import fs from "node:fs"

const grid = fs.readFileSync("input.txt", "utf8").split("\n");

const maxColumnLength = grid[0].length;
const maxRowLength = grid.length;

const temp = [];
grid.forEach((v, index) => {
    if (Array.from(v.matchAll(/[S]/g)).length) {
        temp.push(index);
        temp.push(Array.from(v.matchAll(/[S]/g))[0]['index']);
    }
})

// S   ->   |-LJF7
const seen = {};
const queue = [];

let [row, column] = temp;

if (column > 0 && "L-F".includes(grid[row][column - 1])) {
    seen[JSON.stringify([row, column - 1])] = 1;
    queue.push([row, column - 1]);
}
if (column < (maxColumnLength - 1) && "J-7".includes(grid[row][column + 1])) {
    seen[JSON.stringify([row, column + 1])] = 1;
    queue.push([row, column + 1]);
}

if (row > 0 && "|F7".includes(grid[row - 1][column])) {
    seen[JSON.stringify([row - 1, column])] = 1;
    queue.push([row - 1, column]);
}
if (row < (maxRowLength - 1) && "|LJ".includes(grid[row + 1][column])) {
    seen[JSON.stringify([row + 1, column])] = 1;
    queue.push([row + 1, column]);
}

const path = [];

[row,column] = queue[0];
path.push(grid[row][column]);

[row,column] = queue[1];
path.push(grid[row][column]);


while (queue.length != 0) {

    // console.log(queue);
    [row, column] = queue.shift();

    const currentChar = grid[row][column];

    // left
    if (column > 0 && !seen[JSON.stringify([row, column - 1])] &&
        "-J7".includes(currentChar) &&
        "L-F".includes(grid[row][column - 1])) {
        seen[JSON.stringify([row, column - 1])] = 1;

        queue.push([row, column - 1]);

        path.push(grid[row][column - 1]);
    }

    // right
    if (column < (maxColumnLength - 1) && !seen[JSON.stringify([row, column + 1])] &&
        "-LF".includes(currentChar) &&
        "J-7".includes(grid[row][column + 1])) {
        seen[JSON.stringify([row, column + 1])] = 1;

        queue.push([row, column + 1]);

        path.push(grid[row][column + 1]);
    }

    // up
    if (row > 0 && !seen[JSON.stringify([row - 1, column])] && 
        "|JL".includes(currentChar) &&
        "|F7".includes(grid[row - 1][column])) {
        seen[JSON.stringify([row - 1, column])] = 1;

        queue.push([row - 1, column]);

        path.push(grid[row - 1][column]);
    }

    // down
    if (row < (maxRowLength - 1) && !seen[JSON.stringify([row + 1, column])] && 
        "|7F".includes(currentChar) &&
        "|LJ".includes(grid[row + 1][column])) {
        seen[JSON.stringify([row + 1, column])] = 1;

        queue.push([row + 1, column]);

        path.push(grid[row + 1][column]);
    }

}

console.log(Math.ceil(path.length / 2));



