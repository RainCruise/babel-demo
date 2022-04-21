"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-19 14:26:22
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-21 23:17:02
 * @Description: entry
 */
const compiler_1 = require("./compiler");
const testInput = '(add 2 (subtract 4 2))';
const output = (0, compiler_1.compiler)(testInput);
console.log('>>>>', output);
exports.default = compiler_1.compiler;
