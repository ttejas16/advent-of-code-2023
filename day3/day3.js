// let obj = {
//     previous:{
//         nums:[[1,3],[4,7]],
//         syms:[],
//     },
//     curr:{
//         nums:[[],[],[]],
//         syms:[1,2,3],
//     }
// }

// part 1 - 546563
// part 2 - 91031374 

import { open } from 'node:fs/promises';
console.time();


const file = await open("./day3/day3.txt");
let sum = 0





// function checkForAdjacent(previousLine, line, obj) {
//     if (!previousLine) {
//         return;
//     }

//     // current symbols and previous nums
//     for (let i = 0; i < obj.current.syms.length; i++) {
//         for (let j = 0; j < obj.previous.nums.length; j++) {
//             if (obj.previous.nums[j].length && obj.current.syms[i][0] - obj.previous.nums[j][0] < -1) {
//                 break;
//             }
//             else if (obj.previous.nums[j].length && obj.current.syms[i][0] - obj.previous.nums[j][0] >= -1 &&
//                 obj.current.syms[i][0] - obj.previous.nums[j][1] <= 1) {
//                 // sum += Number(previousLine.slice(obj.previous.nums[j][0], obj.previous.nums[j][1] + 1));
//                 obj.current.syms[i].push(Number(previousLine.slice(obj.previous.nums[j][0], obj.previous.nums[j][1] + 1)));
//                 obj.previous.nums[j] = [];

//             }
//         }
//     }

//     // current nums and previous symbols
//     for (let i = 0; i < obj.previous.syms.length; i++) {
//         for (let j = 0; j < obj.current.nums.length; j++) {
//             if (obj.current.nums[j].length && obj.previous.syms[i][0] - obj.current.nums[j][0] < -1) {
//                 break;
//             }
//             else if (obj.current.nums[j].length && obj.previous.syms[i][0] - obj.current.nums[j][0] >= -1 &&
//                 obj.previous.syms[i][0] - obj.current.nums[j][1] <= 1) {
//                 obj.previous.syms[i].push(Number(line.slice(obj.current.nums[j][0], obj.current.nums[j][1] + 1)));
//                 // sum += Number(line.slice(obj.current.nums[j][0], obj.current.nums[j][1] + 1));
//                 obj.current.nums[j] = [];

//             }
//         }
//     }

//     // current symbols and current nums
//     for (let i = 0; i < obj.current.syms.length; i++) {
//         for (let j = 0; j < obj.current.nums.length; j++) {

//             if (obj.current.nums[j].length && obj.current.syms[i][0] - obj.current.nums[j][0] < -1) {
//                 // console.log("here",obj.current.nums[j]);
//                 break;
//             }
//             else if (obj.current.nums[j].length && obj.current.syms[i][0] - obj.current.nums[j][0] >= -1 &&
//                 obj.current.syms[i][0] - obj.current.nums[j][1] <= 1) {
//                     // console.log(obj.current.nums[j]);
//                 obj.current.syms[i].push(Number(line.slice(obj.current.nums[j][0], obj.current.nums[j][1] + 1)));
//                 // sum += Number(line.slice(obj.current.nums[j][0], obj.current.nums[j][1] + 1));
//                 obj.current.nums[j] = [];

//             }
//         }
//     }



// }

function checkForAdjacent(line, symbolArray, numsArray) {
    if (!line) {
        return;
    }

    for (let i = 0; i < symbolArray.length; i++) {
        for (let j = 0; j < numsArray.length; j++) {

            if (numsArray[j].length && symbolArray[i][0] - numsArray[j][0] < -1) {
                break;
            }
            else if (numsArray[j].length && 
                    symbolArray[i][0] - numsArray[j][0] >= -1 &&
                    symbolArray[i][0] - numsArray[j][1] <= 1) {
                        
                    symbolArray[i].push(Number(line.slice(numsArray[j][0], numsArray[j][1] + 1)));
                    numsArray[j] = [];


                    // dont delete because deleting will reduce the length 
                    // sum += Number(previousLine.slice(obj.previous.nums[j][0], obj.previous.nums[j][1] + 1));

            }
        }
    }
}


function bruh(previousLine, line, obj) {


    for (let i = 0; i < line.length; i++) {

        if (line[i] >= '0' && line[i] <= '9') {
            let j = i;
            let res = [i];

            while (line[j] >= '0' && line[j] <= '9') {
                j++;
            }
            res.push(j - 1);

            if (!obj.current.nums) {
                obj.current.nums = [];
            }
            obj.current.nums.push(res);


            i = j - 1;
        }
        else if (line[i] == '*') {

            if (!obj.current.syms) {
                obj.current.syms = [];
            }
            obj.current.syms.push([i]);

        }
    }


    // function to check prev and curr
    // console.log(obj);
    // checkForAdjacent(previousLine, line, obj);

    // current symbols and previous nums
    checkForAdjacent(previousLine, obj.current.syms, obj.previous.nums);

    // current nums and previous symbols
    checkForAdjacent(line, obj.previous.syms, obj.current.nums);

    // current symbols and current nums
    checkForAdjacent(line, obj.current.syms, obj.current.nums);



    obj.previous.syms.forEach(element => {
        if (element.length == 3) {
            sum += element[1] * element[2];
        }
    });
    
    obj.previous = obj.current;
    obj.current = {
        nums: [],
        syms: []
    };
}

let previousLine;

const obj = {
    previous: {
        nums: [],
        syms: []
    },
    current: {
        nums: [],
        syms: []
    }
}
// let count = 0;
for await (const line of file.readLines()) {
    // console.log(count++);

    bruh(previousLine, line, obj);
    previousLine = line;

}

console.log(sum);
console.timeEnd()
