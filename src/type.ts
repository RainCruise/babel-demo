/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-17 15:49:41
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-17 16:40:57
 * @Description: file content
 */
export interface TokenEntryType {
  type: string;
  value: string | number;
}

export interface AST_Node {
  type: string;
  name?: string;
  body?: AST_Node[];
  params?: AST_Node[];
  value?: string | number;
  _context?: AST_Node[];
  expression?: any;
  arguments?: any[];
  callee?: any;
}

export interface Visitor {
  NumberLiteral: (node: AST_Node, parent: AST_Node) => void;
  CallExpression: (node: AST_Node, parent: AST_Node) => void;
}
