'use strict'

const ARROW = '→';
const _ = require('ramda');
const TreeNode = require('./treenode');

class HindleyMilnerParser {
	constructor() {};

	parseFunctionSigns (signs){
		const LEFT_BRACKETS = ['{', '[', '('];
		const RIGHT_BRACKETS = ['}', ']', ')'];
		const KEYWORD = ['Number', 'Boolean', 'String', 'Idx'];
		const NOT_FOUNT_INDEX = -1;
		let splitsList = [];
		let keywords = [];
		let stack = [];
		for (let i = 0; i < signs.length; ++i) {
			const start = i;
			let end = i;
			let leftBracket = LEFT_BRACKETS.indexOf(signs[i]);
			if (leftBracket !== NOT_FOUNT_INDEX) {
				stack.push(leftBracket);
				while (stack.length) {
					++i;
					const rightBrackets = RIGHT_BRACKETS.indexOf(signs[i]);
					leftBracket = LEFT_BRACKETS.indexOf(signs[i]);

					if (rightBrackets !== NOT_FOUNT_INDEX && rightBrackets === stack[stack.length - 1]) {
						stack.pop();
					};

					if (leftBracket !== NOT_FOUNT_INDEX) {
						stack.push(leftBracket);
					};
				}
				end = i;
			}
			if (signs[i] === ARROW || start !== end) {
				pushKeyWords(keywords, splitsList);
				keywords = [];
				splitsList.push({
					start,
					end
				});
			} else if (start === end) {
				keywords.push(start);
			}
		}
		pushKeyWords(keywords, splitsList);

		return splitsList.map(index => signs.substring(index.start, index.end + 1));
	}

	pushKeyWords = (keywords, splitsList) => {
		if (!keywords.length) return;
		splitsList.push({
			start: keywords[0],
			end: keywords[keywords.length - 1]
		});
	}
	
	parse = (signs) => {
		const splitFunctionSign = parseFunctionSigns(signs);
		return tree(splitFunctionSign, 'FUNCTION');
	}

}

module.exports = parseAndTree;

