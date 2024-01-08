import fs from "node:fs";


// const input = fs.readFileSync("test.txt", "utf8").split("\n").map(v => v.split(""));
const input = fs.readFileSync("input.txt", "utf8").split("\n").map(v => v.split(""));

let count = 1;

console.time()

let emptySize = 1000000;
let emptyRowIndices = [];
let emptyColIndices = [];

let expandedInput = input.map((v, index) => {
    if (!v.includes("#")) {
        emptyRowIndices.push(index);
    }
    return [v];
})

expandedInput = expandedInput.flat(1);

// console.log(expandedInput.map(v => v.join("")));
let transpose = expandedInput[0].map((v, index) => {

    const temp = expandedInput.map(r => r[index])
    if (!temp.includes("#")) {
        emptyColIndices.push(index)
    }
    return temp;

});
transpose = transpose.map((v) => {
    // if (!v.includes("#")) {
    //     emptyIndices.push(index);
    // }
    return [v];
}).flat(1)


expandedInput = transpose[0].map((v, index) => transpose.map(r => r[index]).join(""));

// console.log(expandedInput);

const vertices = [];

let parsedInput = expandedInput.map((v, index) => {

    while (v.includes("#")) {
        vertices.push({ vertex: count, indexes: [index, v.indexOf("#")] })
        v = v.replace("#", "V");
        count++;
    }
    return v;
})


// [6 , 1]
// [11, 5] 

let res = 0;
const visited = {};
function allPairShortest() {

    for (let i = 0; i < vertices.length - 1; i++) {
        // console.log(i);
        const firstVertex = vertices[i]['vertex'];

        for (let j = i + 1; j < vertices.length; j++) {
            // console.log(j);
            const secondVertex = vertices[j]['vertex'];


            if (JSON.stringify([firstVertex, secondVertex]) in visited ||
                JSON.stringify([secondVertex, firstVertex]) in visited) {
                continue;
            }
            
            let l1, l2;

            l1 = emptyRowIndices.filter((v) => v < vertices[i]['indexes'][0]).length;
            l2 = emptyRowIndices.filter((v) => v < vertices[j]['indexes'][0]).length;


            const extraRows1 = l1 * emptySize - l1;
            const extraRows2 = l2 * emptySize - l2;


            const rowDiff = (vertices[j]['indexes'][0] + extraRows2) - (vertices[i]['indexes'][0] + extraRows1);


            l1 = emptyColIndices.filter((v) => v < vertices[i]['indexes'][1]).length;
            l2 = emptyColIndices.filter((v) => v < vertices[j]['indexes'][1]).length;

            const extraCols1 = l1 * emptySize - l1;
            const extraCols2 = l2 * emptySize - l2;

            const colDiff = Math.abs((vertices[j]['indexes'][1] + extraCols2) - (vertices[i]['indexes'][1] + extraCols1));

            visited[JSON.stringify([firstVertex, secondVertex])] = [rowDiff + colDiff];

            res = res + rowDiff + colDiff;

        }
    }


}

allPairShortest();

// console.log(vertices[vertices.length - 1]);
// console.log(parsedInput);
// console.log(visited);
console.log(res);
console.timeEnd()