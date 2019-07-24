const parse = require('../src/parse.function.signs.js');
const result = parse('((a…→b)…→[a]→*)→Number→((a…,Int,[a]→b)…→[a]→*)');
console.log(result);