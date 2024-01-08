import fs from "node:fs";

const input = fs.readFileSync("test.txt", "utf8").split("\n\n");

const testMappings = {};
input[0].split("\n").map((v) => {
    const f = v.indexOf("{");
    const l = v.lastIndexOf("}");

    const name = v.slice(0, f);
    const content = v.slice(f + 1, l);

    const temp = content.split(",");
    const obj = {};
    for (const item of temp) {
        let [key, val] = item.split(":");
        if (!val) {
            val = key;
        }
        obj[key] = val;

    }

    testMappings[name] = obj;
    // return { [name]: obj };
});

const tests = input[1].split("\n").map((v) => {
    const slice = v.slice(1, v.length - 1);
    const obj = {}
    slice.split(",").map((v) => {
        // x=something
        obj[v[0]] = +v.slice(v.indexOf("=") + 1);
    })

    return obj;
})

const accepted = [];
const rejected = [];

function processTest(test, mapping) {
    //  test { x: 787, m: 2655, a: 1222, s: 2876 }
    //  mapping -> px: { 'a<2006': 'qkq', 'm>2090': 'A', rfg: 'rfg' } 
    // console.log(test);
    // console.log(mapping);
    
    // if (!mapping) {
    //     return;
    // }

    const mappingKeys = Object.keys(mapping);

    for (const key of mappingKeys) {

        if (key == mapping[key]) {
            if (key == 'R') {
                rejected.push(test);
            }
            else if(key == 'A'){
                accepted.push(test);

            }
            else{
                processTest(test,testMappings[mapping[key]]);
            }
            return;
        }

        const expression = key.replace(key[0],test[key[0]]);

        if (eval(expression)) {
            if (mapping[key] == 'A') {
                accepted.push(test);
            }
            else if(mapping[key] == 'R'){
                rejected.push(test);
            }
            else{
                processTest(test,testMappings[mapping[key]]);
            }
            return;

            
        }
    }

}


// console.log(testMappings);

for (const test of tests) {
    processTest(test,testMappings['in']);
    // break;
    // console.log("\n");
}

let total = 0;

accepted.forEach((v) => {
    let temp = 1;
    for (const key in v) {
        // console.log(v[key]);
        temp *= (4000 - v[key]);
    }
    total += temp;
})

console.log(total);