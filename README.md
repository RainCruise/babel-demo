<!--
 * @Author: ganyutian@bytedance.com
 * @Date: 2022-04-17 16:45:51
 * @LastEditors: ganyutian@bytedance.com
 * @LastEditTime: 2022-04-17 16:48:03
 * @Description: file content
-->
## compiler demo

## usage
const testInput = '(add 2 (subtract 4 2))';

const output = compiler(testInput)); // add(2, (substract(4, 2)))