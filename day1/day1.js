import { open } from 'node:fs/promises';

const file = await open('./day1/day1.txt');


/**
    check what words are occuring first
    compare last index of each word to obtain the last word 
    select minimum for the first one
    check if string exists before min and after max 
    if yes then check for nums else dont check

 */

function findWords(str) {
    let words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let res = [];

    for (const word of words) {
        if (str.includes(word)) {
            res.push(word);
        }
    }
    return res;
}

function parseStringToInt(numString) {
    let words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    if (words.includes(numString)) {
        return words.indexOf(numString) + 1;
    }
    return Number(numString);
}

function getActualNumber(str) {
    let res;
    let min = [], max = [];


    let wordsInString = findWords(str);

    if (wordsInString.length > 0) {
        for (const word of wordsInString) {
            if (min.length == 0 || str.indexOf(word) < min[1]) {
                min[0] = word;
                min[1] = str.indexOf(word);
            }
            if (max.length == 0 || str.lastIndexOf(word) > max[1]) {
                max[0] = word;
                max[1] = str.lastIndexOf(word);
            }
        }

        const left = getNumber(str.slice(0, min[1]));
        const right = getNumber(str.slice(max[1] + max[0].length));

        left ? min[0] = left[0] : null;
        right ? max[0] = right[1] : null;
    }
    else {
        res = getNumber(str);
        return parseStringToInt(res);
    }



    return parseStringToInt(String(parseStringToInt(min[0])) + String(parseStringToInt(max[0])));

}

function getNumber(str) {
    let firstNumber, secondNumber;

    for (let i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            !firstNumber ? firstNumber = str[i] : null;
            secondNumber = str[i];
        }
    }

    if (firstNumber) {
        return firstNumber + secondNumber;

    }
    return undefined;

}


let sum = 0;
for await (const line of file.readLines()) {
    sum += getActualNumber(line);
}

console.log(sum);
