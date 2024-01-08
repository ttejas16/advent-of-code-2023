import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8").split(",");


function calculateHash(str) {
    let result = 0;

    for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i);
        result *= 17;
        result %= 256;
    }

    return result;
}

let boxes = {};
let hashes = {};

let total = 0;

for (let i = 0; i < input.length; i++) {


    const signIndex = input[i].match(/[=|-]/)['index'];

    const label = input[i].slice(0, signIndex);
    const sign = input[i].slice(signIndex, signIndex + 1);
    const num = input[i].slice(signIndex + 1);



    !(label in hashes) ? hashes[label] = calculateHash(label) : null;

    const hash = hashes[label];

    // console.log(hash);

    if (!boxes[hash]) {
        boxes[hash] = [];
    }

    if (sign == "=") {

        // replace old one with new one
        if (boxes[hash].filter(([l, n]) => l == label).length != 0) {

            for (const item of boxes[hash]) {
                if (item[0] == label) {
                    item[1] = num;
                    break;
                }
            }

        }
        else {
            boxes[hash].push([label, num]);
        }
    }
    else {
        boxes[hash] = boxes[hash].filter(([l, n]) => l != label);
    }
    // console.log(input[i]);
    // console.log(boxes);
    // console.log();
}

let result = 0;
for (const key in boxes) {
    for(let i = 0; i < boxes[key].length; i++){
        // console.log(boxes[key]," ");
        result += (+key + 1) * (i + 1) * (+boxes[key][i][1]);
    }
    // console.log();
}

console.log(result);