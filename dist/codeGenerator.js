"use strict";
/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-17 16:39:18
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-21 23:28:52
 * @Description: codeGenerator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeGenerator = void 0;
/**
 * 代码生成器同样是个递归函数，最后会将 AST 中的每个结点打印到一个大的字符串中:
 */
const codeGenerator = (node) => {
    var _a, _b, _c, _d;
    switch (node.type) {
        // 如果是 Program，则会遍历 'body' 属性中的每个结点
        // 并且对这些结点进行递归 codeGenerator,再把结果打印进新的一行里面
        case 'Program':
            return `${(_b = (_a = node.body) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.call(_a, exports.codeGenerator).join('\n')}`;
        // 对于 ExpressionStatement 对 expression 属性进行递归调用，并加个分号
        case 'ExpressionStatement':
            return `${(0, exports.codeGenerator)(node.expression)};`;
        // 对于 CallExpression 对 callee 属性进行递归调用，接着加上(括号
        // 然后对 arguments 属性进行递归调用，并加上)括号
        case 'CallExpression':
            return `${(0, exports.codeGenerator)(node.callee)}(${(_d = (_c = node.arguments) === null || _c === void 0 ? void 0 : _c.map) === null || _d === void 0 ? void 0 : _d.call(_c, exports.codeGenerator).join(', ')})`;
        // 对于 Identifier,直接返回 name
        case 'Identifier':
            return `${node.name}`;
        // 对于 NumberLiteral,直接返回 value
        case 'NumberLiteral':
            return `${node.value}`;
        default:
            throw new Error(`Unknown node type: ${node.type}`);
    }
};
exports.codeGenerator = codeGenerator;
