import fs from "node:fs";
// const input = fs.readFileSync('./day6/test.txt',"utf8").split("\n");
const input = fs.readFileSync('./day6/input.txt',"utf8").split("\n");
console.time()

const times = input[0].split(":")[1].split(" ").filter((v) => v.length).map((v) => parseInt(v))
const distances = input[1].split(":")[1].split(" ").filter((v) => v.length).map((v) => parseInt(v))

const time = parseInt(times.reduce((acc,v) => acc + v,''));
const distance = parseInt(distances.reduce((acc,v) => acc + v,''));

// part 1 - 345015
// part 2 -  42588603

let total = 1;

// times.forEach((time,index) => {
    // const currentDistance = distances[index];
    let temp = 0;
    let ub;
    if (time % 2 != 0) {
        ub = Math.floor(time /2);
    }
    else{
        ub = parseInt(time / 2);
    }
    // console.log("ub"+ub);
    for(let i = 0 ;i <= ub ;i++){
        if (i * (time - i) > distance) {
            i == (time -i) ? temp += 1 : temp += 2;
        }
    }
// console.log(temp);
    total *= temp
   
// })

console.log(total);
console.timeEnd()