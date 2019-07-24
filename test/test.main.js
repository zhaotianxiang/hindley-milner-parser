const HMP = require('../src/hindley.milner.parser.js');
const hmp = new HMP();
const result = hmp.parse('((a…→b)…→[a]→*)→Number→((a…,Int,[a]→b)…→[a]→*)');
console.log(result);