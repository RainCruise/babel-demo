"use strict";
/*
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-17 16:41:41
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-17 16:45:03
 * @Description: compiler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compiler = void 0;
const tokenizer_1 = require("./tokenizer");
const parser_1 = require("./parser");
const transformer_1 = require("./transformer");
const codeGenerator_1 = require("./codeGenerator");
/**
 * input => tokenizer => tokens
 *
 * tokens => parser => ast
 *
 * ast => transformer => newAst
 *
 * newAst => generator => output
 */
const compiler = (inputString) => {
    const tokens = (0, tokenizer_1.tokenizer)(inputString);
    const ast = (0, parser_1.parser)(tokens);
    const newAst = (0, transformer_1.transformer)(ast);
    const output = (0, codeGenerator_1.codeGenerator)(newAst);
    return output;
};
exports.compiler = compiler;
