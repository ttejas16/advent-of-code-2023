


const str = "this 123 455 is text";
let res = Array.from(str.matchAll(/\d+/g));

console.log(str.substring(res[0]["index"],res[0]["index"]+res[0][0].length))