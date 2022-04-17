/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-17 16:41:41
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-17 16:45:03
 * @Description: compiler
 */

import { tokenizer } from './tokenizer';
import { parser } from './parser';
import { transformer } from './transformer';
import { codeGenerator } from './codeGenerator';

/**
 * input => tokenizer => tokens
 *
 * tokens => parser => ast
 *
 * ast => transformer => newAst
 *
 * newAst => generator => output
 */
export const compiler = (inputString: string) => {
  const tokens = tokenizer(inputString);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = codeGenerator(newAst);
  return output;
}