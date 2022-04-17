import { AST_Node, AST_Node, Visitor } from "./type";

/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-17 16:03:26
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-17 16:27:21
 * @Description: traverser
 */


const visitor: Visitor = {
  NumberLiteral() {},
  CallExpression() {}
};

/**
 * 通过语法分析得到 ast 之后，接下来需要一个遍历器 (visitors) 去遍历结点。
 * 然后当遇到某个类型的结点的时候，可以调用 visitors 中对应的类型处理函数:
 */
export const traverser = (ast: AST_Node, visitor: Visitor) => {
    // 用于对数组中的每个元素都调用 traverseNode 函数
    const traverseArray = (array: AST_Node[], parent: AST_Node) => {
      array.forEach((child) => {
        traverseNode(child, parent);
      });
    }

    // 函数接收一个 node 以及其父结点作为参数
    // 这个结点会被传入到 visitor 中相应的处理函数那里
    const traverseNode = (node: AST_Node, parent: AST_Node) => {
      const method = visitor[node.type];
      if (method) {
        method(node, parent);
      }
      // 对不同的结点分开处理
      switch (node.type) {
        case 'Program':
          traverseArray(node.body, node);
          break;

        case 'CallExpression':
          traverseArray(node.params, node);
          break;
          
        // 这种情况下就没有子节点了，直接 break 出去
        case 'NumberLiteral':
          break;
        
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    }

    traverseNode(ast, null);
}
