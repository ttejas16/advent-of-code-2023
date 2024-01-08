import { open } from "node:fs/promises";

const file = await open('./day5/day5.txt');
// const file = await open('./day5/test.txt');


console.time()
function checkLineForMapping(seedArray, line) {
    const arr = line.split(" ").map((value) => parseInt(value));


    for (let i = 0; i < seedArray.length; i += 1) {

        if (seedArray[i].mappedValue >= arr[1] && seedArray[i].mappedValue <= (arr[1] + arr[2] - 1)) {

            const additionOffset = seedArray[i].mappedValue - arr[1];
            seedArray[i].newValue = arr[0] + additionOffset;


        }

    }

}




let seedArray;

for await (const line of file.readLines()) {
    const parts = line.split(": ");
    if (parts[0].includes("seeds")) {
        seedArray = parts[1].split(" ").map((value) => {
            return {
                num: parseInt(value),
                mappedValue: parseInt(value)
            }

        });
    }
    else if (!line) {
        
        seedArray.forEach((v) => {
            // console.log(seedArray);
            if (v.newValue) {
                v.mappedValue = v.newValue;
            }
        })
    }
    else if (line[0] >= '0' && line[0] <= '9') {
        checkLineForMapping(seedArray, line);
    }
}

seedArray.sort((a, b) => a.newValue - b.newValue);

console.log(seedArray[0].newValue)
console.timeEnd()