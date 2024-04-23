/* 错误演示
let a = [];
a = 1;
a.push(1);

let abc = 123;
console.log(abd);

let o = {
  a: 1,
  b: 2,
  f() {},
};
o.a();
o.b();
// 什么是类的静态方法： 不需要对类实例化就可以执行的方法
// 静态类型检查报错（不会模拟运行代码而作出的检查）

var b = 1;
function f() {
  b = [] as any;
}
f();
b.push();

let c = [1, 2, 3];
c.pop();
*/

// 每一个ts文件默认都不是一个具有作用域的模块 为了全局共享类型
// 但是如果在ts中主动使用模块化语法（import、 export、export default ） 那么该文件就具备作用域

// ts的内置类型（内置集合）
// 数字、字符串、布尔值、空、未定义
let n1: number = 123;
let n2: string = "";
let n3: boolean = false;
let n4: null = null;
let n5: undefined = undefined;
// never就是数学集合概念中的空集
let n6!: never;
// 集合中一个成员的自定义集合
let n7: 1 = 1;
let n8: false = false;
let n9: "" = "";
// 集合中出现两个成员怎么处理？
let n10: 1 | 2 = 1;
let n11: 1 | "" = 1;
// 如果有多个成员 需要使用｜连接组成一个新集合
// 以上操作就是数学概念中的并集
let n12: never | 1 = 1;
// 交集
let n13: number & 1 = 1;
let n14: number & string;

/**
  总结： 
   1. 类型的本质是集合，赋值的本质是值属不属于该集合
   2. 类型的运算（｜联合、&交叉）相当于数学中集合的运算（并集、交集）
 */
// ! 确定赋值断言
let n15!: 1 | 2 | 3;
let n16!: 1 | 2;

// 如果变量a：A可以赋值给变量b：B （b=a不报错）则说明什么？
// A是B的子集
// number完全包含1｜2的范围
// n15 = n16;
// n16 = n15;

// !!!变量的初始化和变量间的赋值本质都是判断包含关系

// 顶部类型和底部类型
// 顶部类型是所有集合的父集，顶部类型是所有类型的父类型（any、unknown）
// 底部类型是所有结合的子集，底部类型是所有类型的子类型（any、undefined、null、never）
// 如何验证某一个类型是顶部类型？？
let n17: any;
n17 = n1; // any是包含number
n17 = n2; // any是包含string
n17 = n3;
n17 = n4;
n17 = n5;
n17 = n6;
n17 = n7;
n17 = n8;

let m1: number = n6;
let m2: string = n6;
let m3: boolean = n6;

let m4: number;
m4 = 123;

// let m5: unknown = [];
function f(arg: unknown) {
  if (typeof arg === "number") {
    return arg;
  }
  throw new Error("arg类型不正确！");
}

// 并集 => 联合类型
// 怎么去定义自定义类型呢？type
// 使用type关键字定义新类型！
type ns = number | string;
type one = 1;
type two = 2;
// 使用type关键字给原有类型设置别名
type N = number;
let m5: ns;
let m6: number | string;
// 类型K和变量K会冲突么？
type K = number & never;
let K = 123;

export default {};
