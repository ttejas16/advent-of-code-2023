import fs from "node:fs";
import { exit } from "node:process";

const input = fs.readFileSync("./day9/input.txt", "utf8");
const histories = input.split("\n").map((v) => {
    return v.split(" ").map((v) => parseInt(v));
});

console.time();
let sum = 0;


// part 1
function anaylzeHistory(history) {
    let diffs = [];

    for (let i = 1; i < history.length; i++) {
        diffs.push(history[i] - history[i - 1]);
    }


    const go = diffs.some(v => v != 0);
    let lastVal = 0;

    if (go) {
        lastVal = anaylzeHistory(diffs);
    }

    return history[history.length - 1] + lastVal;
}

// part 2
function anaylzeHistoryPart2(history) {
    let diffs = [];

    for (let i = 1; i < history.length; i++) {
        diffs.push(history[i] - history[i - 1]);
    }


    const go = diffs.some(v => v != 0);
    let lastVal = 0;

    if (go) {
        lastVal = anaylzeHistoryPart2(diffs);
    }

    return history[0] - lastVal;
}



histories.forEach((history) => {
    // sum += anaylzeHistory(history);
    sum += anaylzeHistoryPart2(history);
})

// console.log(input);

console.log(sum);
console.timeEnd();



