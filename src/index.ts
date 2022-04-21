/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-19 14:26:22
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-21 23:17:02
 * @Description: entry
 */
import { compiler } from "./compiler";

const testInput = '(add 2 (subtract 4 2))';

const output = compiler(testInput); 

console.log('>>>>', output);

export default compiler;
