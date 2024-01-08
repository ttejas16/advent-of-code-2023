import fs from "node:fs";

// const input = fs.readFileSync("test.txt", "utf8").split("\n");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

console.time()
const patterns = [];


let temp = []
input.forEach((v) => {
    if (v.length === 0) {
        patterns.push(temp);
        temp = [];
    }
    else {
        temp.push(v);
    }

})

patterns.push(temp);

// console.log(patterns);

function getTranspose(arg) {
    const temp = arg[0].split("");

    return temp.map((_, index) => arg.map((v) => v[index]).join(""));
}

function checkMirror(ptrn) {
    let obj = {};

    for (let i = 1; i < ptrn.length; i++) {
        if (ptrn[i] in obj) {
            const up = ptrn.slice(1,i).reverse().join("");
            const down = ptrn.slice(i).join("");

            if (up.length == down.length && up === down) {
                return i + 1;
            }
            break;
        }
        else {
            obj[ptrn[i]] = 1;
        }
    }
    return 0;
}

let res = 0;
for (let i = 0; i < patterns.length; i++) {
    

    let resIndex = checkMirror(patterns[i]);

    res += (resIndex * 100);

    resIndex = checkMirror(getTranspose(patterns[i]));
    
    res += resIndex;
    console.log(i);

}

console.timeEnd();
console.log(res);


