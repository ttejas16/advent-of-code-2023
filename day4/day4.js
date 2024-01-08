import { open } from 'node:fs/promises';

const file = await open("./day4/day4.txt");
console.time();
// part 1 - 26346
// part 2 - 8467762

let totalPoints = 0;
let arr = [];
const map = new Map();

function getPoints(winningPoints, pointsObtained) {
    let points = 0;
    let matches = 0;

    let po = new Set(pointsObtained);
    return winningPoints.filter((v) => po.has(v)).length


    console.log(winningPoints,pointsObtained);
    for (const point of winningPoints) {
        if (point && pointsObtained.includes(point)) {
            points = 2 ** matches;
            matches++;
        }
    }
    return matches;
}

function countCards(row, currentIndex) {
    const temp = row[0].split(" ");
    const card = temp[temp.length - 1];
    
    if (map.has(card)) {
        return map.get(card);
    }

    let total = 1;
    for (let i = currentIndex + 1; i <= (currentIndex + row[1]); i++) {
        total += countCards(arr[i],i);
    }
    map.set(card,total);
    return total;
}


let res = [];
for await (const line of file.readLines()) {
    res.push(0);
    const content = line.split(":");
    const pointCollection = content[1].split("|");

    // totalPoints += getPoints(pointCollection[0].split(" "), pointCollection[1].split(" "));
    const matches = getPoints(pointCollection[0].split(" ").filter((v) => v), pointCollection[1].split(" ").filter((v)=>v));
    arr.push([content[0], matches]);

}

for (let i = 0; i < res.length; i++) {
    countCards(arr[i], i);
}

console.log(Array.from(map.values()).reduce((prev,curr) => prev + curr,0));
console.timeEnd();