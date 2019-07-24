'use strict'
const _ = require('ramda');
const ATS = require('./abstract.syntax.tree');
const parseFunctionSigns = require('./parse.function.signs.js');

class HindleyMilnerParser {
	constructor() { };

	parse(signs) {
		const signsList = parseFunctionSigns(signs);
		return new ATS().build(signsList);
	}
}

module.exports = HindleyMilnerParser;

