import fs from "node:fs";

let input = fs.readFileSync("input.txt", "utf8").split("\n");
const length = input.length;

let sortValues = {
    'O': 0,
    '.': 1,
}


// function processColumn(j) {

//     for (let i = 0; i < length; i++){
//         while(i < length && input[i][j] == "#"){
//             i++;
//         }

//         let count = 0;
//         let start = i;

//         while(i < length && input[i][j] != "#"){
//             if (input[i][j] == "O") {
//                 count++;
//             }
//             i++;
//         }

//         for(let z = start; z < start + count;z++){
//             ans += length - z;
//         }
//     }

// }

// input[0].split("").forEach((_,index) => {
//     processColumn(index);
// })


function transposeInput(grid) {
    return grid[0].split("").map((_, i) => grid.map((v) => v[i]).join(""));
}

function cycle() {
    for (let i = 0; i < 4; i++) {
        input = transposeInput(input);
        for (let i = 0; i < length; i++) {

            input[i] = input[i].split("#").map(v => {
                return Array.from(v).sort((a, b) => sortValues[a] - sortValues[b]).join("")
            }).join("#");

        }

        for (let i = 0; i < length; i++) {

            input[i] = input[i].split("").reverse().join("");

        }


    }

}

const seen = {};
const arr = [];

seen[input.join("|")] = 1;
arr.push(input.join("|"));

let count = 0;
while (true) {

    count++;
    cycle();
    if (input.join("|") in seen) {
        break;
    }

    seen[input.join("|")] = 1;
    arr.push(input.join("|"));
}

let first = arr.indexOf(input.join("|"));
const cycleLength = count - first;

const pos = (((10 ** 9) - first) % (cycleLength)) + first;
const finalState = arr[pos]
let res = 0;



finalState.split('|').forEach((v, index) => {
    res += ((v.match(/O/g) || []).length) * (length - index);
})



console.log(res);

