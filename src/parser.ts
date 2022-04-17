/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-17 15:48:47
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-17 16:10:31
 * @Description: parser
 */
import { AST_Node, AST_Node, TokenEntryType } from "./type";

/**
 * 词法分析器接收语法分析得到的 token 数组，然后将其转换成 AST 结构。
 * 例如：
 * [{ type: 'paren', value: '(' }, ...] => { type: 'Program', body: [...] }
 */
export const parser = (tokens: TokenEntryType[]): AST_Node => {
  let currentIndex = 0;

  const walk = (): AST_Node => {
    let token = tokens[currentIndex];
    // 如果是 number 类型的结点，返回一个新的 ast 节点即可
    if (token.type === 'number') {
      currentIndex ++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }
    // 检查 CallExpression 类型，先从左圆括号开始
    if (token.type === 'paren' && token.value === '(') {
      // 跳过左圆括号
      token = tokens[++currentIndex];
      // 首先会创建一个 CallExpression 的根节点，然后 name 设置成当前的 token.value
      // 因为左圆括号后的 token 一定是函数名称
      const node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };
      // 这里再跳一次函数名称
      token = tokens[++currentIndex];
      // 通过循环遍历接下来的每个 token，直到遇到右圆括号
      // 这些 token 会成为 `CallExpression` 的  `params`
      // 以 lisp 风格的代码来说: (add 2 (substract 4 2))
      /**
       * token 中会有很多圆括号
       * [
          { type: 'paren',  value: '('        },
          { type: 'name',   value: 'add'      },
          { type: 'number', value: '2'        },
          { type: 'paren',  value: '('        },
          { type: 'name',   value: 'subtract' },
          { type: 'number', value: '4'        },
          { type: 'number', value: '2'        },
          { type: 'paren',  value: ')'        }, <<< 右圆括号
          { type: 'paren',  value: ')'        }  <<< 右圆括号
        ]
        遇到嵌套的 CallExpressions 的时候，会通过 walk 函数来处理
       *
       */
      while (token.type !== 'paren' || (token.value !== ')' && token.type === 'paren')) {
        node.params.push(walk());
        token = tokens[currentIndex];
      }
      currentIndex ++;
      return node;
    }

    throw new Error(`Unknown token type: ${token.type}`);
  }

  /**
   * 创立根节点
   */
  const ast = {
    type: 'Program',
    body: [],
  };

  /**
   * 使用递归函数将结点处理进 ast.body 中
   */
   while (currentIndex < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}
