import { open } from 'node:fs/promises';

const file = await open("./day2/day2.txt");

// r  g  b
// 12 13 14 
const colors ={
    red:12,
    green:13,
    blue:14
}

function parseEachSet(set){
    const arr = set.split(",");

    for (let index = 0; index < arr.length; index++) {
        const finalArr = arr[index].split(" "); 
        
        if(finalArr[1] > colors[finalArr[2]]){
            return false;
        } 
    }
    return true;
}


function findMinimumRequired(obj,set){
    const arr = set.split(",");
    
    arr.forEach(element => {
        const finalArr = element.split(" ");
        const color = finalArr[2];

        const count = Number(finalArr[1]);

        if (!obj[color]) {
            obj[color] = count;
        }
        else if(count > obj[color]){
            obj[color] = count;
        }


    });

}

function isvalid(setString) {
    const setArray = setString.split(";");
    const obj = {};
    
    for (let index = 0; index < setArray.length ; index++) {
        // parseEachSet(setArray[index]);
        findMinimumRequired(obj,setArray[index]);
        // console.log(obj);
    }

    let power = 1;

    for (const key in obj) {
        power = power * obj[key];
    }

    // console.log(obj);
    return power;

}



let validIdSum = 0;
for await (const line  of file.readLines()){

    const arr = line.split(":");
    const id = Number(arr[0].split(" ")[1]);

    validIdSum += isvalid(arr[1]);
    // break;s
}

console.log(validIdSum);