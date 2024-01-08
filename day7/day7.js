import fs from "node:fs";
import { exit } from "node:process";

const cardValues = {
    "A": 13, "K": 12, "Q": 11, "J": 0, "T": 9,
    "9": 8, "8": 7, "7": 6, "6": 5, "5": 4,
    "4": 3, "3": 2, "2": 1,
}
const input = fs.readFileSync("./day7/input.txt", "utf-8").split("\n").map(v => v.split(" "));

console.time();

// part 1
function calculateType(hand) {


    const chars = new Set(hand);
    let type;
    let occurences = {};



    switch (chars.size) {
        case 1:
            type = 1;
            break;

        case 2:
            occurences = {};
            for (let i = 0; i < hand.length; i++) {
                if (!occurences[hand[i]]) {
                    occurences[hand[i]] = 1;
                }
                else {
                    occurences[hand[i]]++;
                }
            }

            if (Object.values(occurences).includes(3)) {
                type = 3;
            }
            else {
                type = 2;
            }
            break;

        case 3:
            occurences = {};
            for (let i = 0; i < hand.length; i++) {
                if (!occurences[hand[i]]) {
                    occurences[hand[i]] = 1;
                }
                else {
                    occurences[hand[i]]++;
                }
            }

            if (Object.values(occurences).includes(3)) {
                type = 4;
            }
            else {
                type = 5;
            }
            break;

        case 4:
            type = 6;
            break;

        case 5:
            type = 7;
            break;

        default:
            break;
    }
    return type;

}

// part2
function calculateTypePart2(hand) {

    const chars = new Set(hand);
    let totalJokers = 0;
    // if (chars.has("J")) {
        totalJokers = Array.from(hand.matchAll(/J/g)).length;
    // }
    if (totalJokers < 5) {
        chars.delete("J");
    }

    let type;
    let occurences = {};
    let maxkey;

  

    switch (chars.size) {
        case 1:
            type = 1;
            break;

        case 2:
            occurences = {};
            maxkey = null;

            for (let i = 0; i < hand.length; i++) {
                if (hand[i] == 'J') {
                    continue;
                }
                if (!occurences[hand[i]]) {
                    occurences[hand[i]] = 1;
                }
                else {
                    occurences[hand[i]]++;
                }
            }

            maxkey = Object.keys(occurences).reduce((a, b) => occurences[a] > occurences[b] ? a : b);
            occurences[maxkey] += totalJokers;

            // console.log(hand , chars,occurences);
            if (Object.values(occurences).includes(3)) {
                type = 3;
            }
            else {
                type = 2;
            }
            break;

        case 3:
            occurences = {};
            maxkey = null;

            for (let i = 0; i < hand.length; i++) {
                if (hand[i] == 'J') {
                    continue;
                }
                if (!occurences[hand[i]]) {
                    occurences[hand[i]] = 1;
                }
                else {
                    occurences[hand[i]]++;
                }
            }

            maxkey = Object.keys(occurences).reduce((a, b) => occurences[a] > occurences[b] ? a : b);
            occurences[maxkey] += totalJokers;
            // console.log(hand , chars,occurences);

            if (Object.values(occurences).includes(3)) {
                type = 4;
            }
            else {
                type = 5;
            }
            break;

        case 4:
            type = 6;
            break;

        case 5:
            type = 7;
            break;

        default:
            break;
    }
    return type;




}

input.forEach((value, index) => {
    // value.push(calculateType(value[0]));
    value.push(calculateTypePart2(value[0]));
    // exit(0);
})

input.sort((a, b) => {
    if (a[2] != b[2]) {
        return b[2] - a[2];
    }

    // console.log("a"+a);
    // console.log("b"+b);
    for (let index = 0; index < a[0].length; index++) {
        // console.log(cardValues[b[0][index]],cardValues[a[0][index]]);
        if (cardValues[b[0][index]] > cardValues[a[0][index]]) {
            // console.log();
            return -1;
        }
        else if (cardValues[b[0][index]] < cardValues[a[0][index]]) {
            return 1;
        }
    }
    // console.log();
    // return 1;
});

let total = 0;
input.forEach((v, index) => {
    if (v[0].includes("J")) {
        // console.log(v);
    }
    total += parseInt(v[1]) * (index + 1);
})

// console.log(input);
console.timeEnd()
console.log(total);