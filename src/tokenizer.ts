/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-17 15:41:22
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-17 15:52:26
 * @Description: tokenizer
 */
import { TokenEntryType } from "./type";

/**
 * 这个函数接收一个字符串，然后将其分割成由 token 组成的数组:
 * ex:
 * (add 2 (substract 4 2)) =>[{ type: 'paren', value: '('}, ...]
 */
export const tokenizer = (inputString: string): TokenEntryType[] => {
  const tokens = [];
  let currentIndex = 0;

  while (currentIndex < inputString.length) {
    let char = inputString[currentIndex];
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });
      currentIndex ++;
      continue;
    }
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      })
      currentIndex ++;
      continue;
    }

    // 空格直接跳过
    if (/\s/.test(char)) {
      currentIndex ++;
      continue;
    }
    // 处理数字
    if (/[0-9]/.test(char)) {
      let value = '';
      // 一直遍历直到遇到非数字的字符
      while (/[0-9]/.test(char)) {
        value += char;
        char = inputString[++currentIndex];
      }
      tokens.push({
        type: 'number',
        value,
      });
      continue;
    }
    // 处理字符串
    if(/[a-z]/i.test(char)) {
      let value = '';

      while(/[a-z]/i.test(char)) {
        value += char;
        char = inputString[++currentIndex];
      }
      tokens.push({
        type: 'name',
        value,
      });
      continue;
    }

    // 如果存在匹配不上的 token 就抛错
    throw new Error(`Unknown token: ${char}`);
  }
  return tokens;
}
