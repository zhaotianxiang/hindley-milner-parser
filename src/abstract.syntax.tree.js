'use strict'

const parseFunctionSigns = require('./parse.function.signs');

class Node {
    constructor(type = 'FUNCTION') {
        this.type = type;
        this.index;
        this.signs;
        this.input = [];
        this.output = [];
        this.children = [];
    }
};

class AbstractSyntaxTree {
    constructor() {
        this.baseTypeList = ['Number', 'Object', 'LIST'];
        this.root = new Node();
        this.arrow = '→'
    }

    build(signList) {
        const tnode = new Node();
        tnode.signs = signList.join('');
        if (signList.length <= 1) {
            return tnode;
        };

        tnode.output = signList[signList.length - 1];
        for (let i = signList.length - 2; i >= 0; i--) {
            if (signList[i] === this.arrow) {
                continue;
            };
            tnode.input.push(signList[i]);
        }

        // 递归进行
        tnode.input.map(rawSign => {
            if (this._getTypeName(rawSign) === 'FUNCTION') {
                const sign = rawSign.substring(1, rawSign.length - 1);
                tnode.children.push(this.build(parseFunctionSigns(sign), 'FUNCTION'));
            }
        });

        return tnode;
    }

    _getTypeName(signs) {
        if (signs[0] == '(' && signs[signs.length - 1] == ')') {
            return 'FUNCTION';
        }
        if (signs[0] == '[' || signs[signs.lenght - 1] == ']') {
            return 'LIST';
        }
        if (signs[0] == '{' && signs[signs.lenght - 1] == '}') {
            return 'Object';
        }
        if (this._insignList(signs))
            return signs;

        return 'KEYWORD';
    };

    _insignList(target) {
        for (let i in this.baseTypeList) {
            if (this.baseTypeList[i] == target) {
                return true;
            }
        }
        return false;
    }

}

module.exports = AbstractSyntaxTree;
