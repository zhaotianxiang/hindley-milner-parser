'use strict'

const parseFunctionSigns = request();

class TreeNode {
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
    constructor(){
        this.baseTypeList = ['Number', 'Object', 'LIST'];
        this.root = new TreeNode();
    }

    build(array, typename) {
        tnode.typename = typename;
        tnode.signs = array.join('');
        if (array.length <= 1) {
            return tnode;
        };

        tnode.output = array[array.length - 1];
        for (let i = array.length - 2; i >= 0; i--) {
            if (array[i] === ARROW) {
                continue;
            };
            tnode.input.push(array[i]);
        }

        // 递归进行
        tnode.input.map(rawSign => {
            if (getTypeName(rawSign) === 'FUNCTION') {
                const sign = rawSign.substring(1, rawSign.length - 1);
                tnode.children.push(tree(parseFunctionSigns(sign), 'FUNCTION'));
            }
        });

        return tnode;
    }

    getTypeName(signs) {
        if (signs[0] == '(' && signs[signs.length - 1] == ')') {
            return 'FUNCTION';
        }
        if (signs[0] == '[' || signs[signs.lenght - 1] == ']') {
            return 'LIST';
        }
        if (signs[0] == '{' && signs[signs.lenght - 1] == '}') {
            return 'Object';
        }
        if (_inArray(signs))
            return signs;

        return 'KEYWORD';
    };

    _inArray(target) {
        for (let i in this.baseTypeList) {
            if (this.baseTypeList[i] == target) {
                return true;
            }
        }
        return false;
    }

}

module.exports = TreeNode;
