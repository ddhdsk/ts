// !!! 数组类型 ！！！
// 定义一个纯数字数组
let a1: number[] = [1, 2, 3, 4];
let a2: undefined[] = [undefined, undefined];
let a3: Array<string> = ["hi", "ts"];
// T[] 等价于 Array<T> 其中T表示任意类型
// 情况1:数组中每个成员的类型相同 开发中居多
// 情况2:数组中每个成员的类型不相同 学习中居多

// typeof

let n1: number = 1;
type N1 = typeof n1;

type A1 = typeof a1;
// a1是数组的数据
// A1是数组的类型
console.log(a1[0]);
