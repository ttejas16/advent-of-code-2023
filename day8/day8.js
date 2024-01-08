import fs from "node:fs";

const input = fs.readFileSync("./day8/input.txt", { encoding: "utf8" }).split("\n").filter(v => v.length);

console.time();
const directionsValues = { "L": 0, "R": 1 };
const directions = input[0];


let startArray = [];

const destinations = {}

input.slice(1).forEach((v) => {
    const temp = v.split(" = ");
    if (temp[0].endsWith("A")) {
        startArray.push(temp[0]);
    }
    const dests = temp[1].slice(1, temp[1].length - 1).split(", ");
    destinations[temp[0]] = dests;
})


function part1() {
    let steps = 0;
    let start = "AAA";
    let i = 0;

    while (start != "ZZZ") {
        let whereToGo = directionsValues[directions[i]];
        start = destinations[start][whereToGo];
        steps++;
        i++;
        i = i % directions.length;
    }
    console.log(steps);
}

// part1();



// part 2
function checkIfComplete(str) {
    // if (startArray[0].endsWith("Z")) {
    //     return true;
    // }
    // return false;

    return str.endsWith("Z");
    // if (startArray.some((v) => !v.endsWith("Z"))) {
    //     return false;
    // }
    // return true;
}


// just take lcm dumbfuck me lowest common multiple
// every node has a cycle which takes the path starting to the initial node
// so after a common multiple every node would have reached the destination
let stepsArr = []

function part2() {
    let i = 0;

    for (let j = 0; j < startArray.length; j++) {
        let steps = 0;

        while (!checkIfComplete(startArray[j])) {
            let whereToGo = directionsValues[directions[i]];
            startArray[j] = destinations[startArray[j]][whereToGo];
            steps++;
            i++;
            i = i % directions.length;
        }
        stepsArr.push(steps);

    }
    console.log(stepsArr);

}
part2();

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

console.log(stepsArr.reduce(lcm))

console.timeEnd()