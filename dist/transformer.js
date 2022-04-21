"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformer = exports.visitor = void 0;
/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-17 16:28:49
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-21 23:25:53
 * @Description: transformer
 */
const traverser_1 = require("./traverser");
exports.visitor = {
    // 处理 NumberLiteral 类型
    NumberLiteral: (node, parent) => {
        var _a, _b;
        (_b = (_a = parent._context) === null || _a === void 0 ? void 0 : _a.push) === null || _b === void 0 ? void 0 : _b.call(_a, {
            type: 'NumberLiteral',
            value: node.value,
        });
    },
    // 处理 CallExpression 类型
    CallExpression: (node, parent) => {
        var _a, _b;
        let expression = {
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: node.name
            },
            arguments: [],
        };
        node._context = expression.arguments;
        // 看看父节点是不是 CallExpression
        if (parent.type !== 'CallExpression') {
            // 如果不是的话，就将 CallExpression 节点包在一个叫 `ExpressionStatement` 的语句节点里
            // 这么做是因为 top level 的 CallExpression 在 JavaScript 中也可以被当成是声明语句
            expression = {
                type: 'ExpressionStatement',
                // @ts-expect-error
                expression,
            };
        }
        // 最后我们把 CallExpression 放入父结点的 context 中
        (_b = (_a = parent._context) === null || _a === void 0 ? void 0 : _a.push) === null || _b === void 0 ? void 0 : _b.call(_a, expression);
    }
};
/**
 * 转换器配合上面的遍历器来一起使用，它接收之前构建好的 ast，然后将其和 visitor 一起传入遍历器中，从而得到一个全新的 AST 出来。
 * 原始的 AST 结构为(add 2 (subtract 4 2)):
 * {
    type: 'Program',
    body: [{
      type: 'CallExpression',
      name: 'add',
      params: [{
        type: 'NumberLiteral',
        value: '2'
      }, {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4'
        }, {
          type: 'NumberLiteral',
          value: '2'
        }]
      }]
    }]
  }
  * 转换之后生成的 AST 结构为(add(2, subtract(4, 2))):
  * {
    type: 'Program',
    body: [{
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'add',
        },
        arguments: [{
          type: 'NumberLiteral',
          value: '2',
        }, {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'subtract',
          },
          arguments: [{
            type: 'NumberLiteral',
            value: '4',
          }, {
            type: 'NumberLiteral',
            value: '2',
          }]
        }]
      }
    }
  }
 */
const transformer = (ast) => {
    const newAst = {
        type: 'Program',
        body: [],
    };
    ast._context = newAst.body;
    (0, traverser_1.traverser)(ast, exports.visitor);
    return newAst;
};
exports.transformer = transformer;
