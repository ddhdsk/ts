// assert 明确肯定;表现坚定;
// 当你和ts的类型判定出现分歧的时候，并且你更加坚定自己的主张的时候（认为自己判断比ts判断更准确），你愿意为你的推断负责。
// HTMLElement\HTMLDivElement\HTMLAnchorElement\Location
// DOM和BOM的内置类型就是对应的构函数的名称
const div = document.getElementById("abc") as HTMLDivElement;
const a = <HTMLAnchorElement>document.getElementById("a");
// 类型断言的条件：断言的类型A和被断言的类型B需要具备包含关系（A包含B/B包含A）

let d1 = { a: 1, b: false };
(d1 as { a: number; b: boolean; c: string }).c = "zfc";
console.log((<{ a: number; b: boolean; c: string }>d1).c);

let d2!: number | string | 123[];
(d2 as 123[] as number[]).push(234);

// 非空断言!
// 作用：将联合类型中的null/undefined去除
type T1 = { value: number | undefined | null };
let d3: T1 = {} as T1;
function updateD3Value(arg: T1) {
  arg.value = 123;
}
updateD3Value(d3);
d3.value!.toFixed(2);
//
const el = document.getElementById("app");
el!.innerHTML = "";

// !!! 断言的作用是让类型更加清晰且避免类型错误同时要让代码运行的时候不能错！！！

// !!! 在保证运行时不报错的前提下 通过断言去解决代码编写时的类型误差 !!!

/// !!! 错误示范 !!!
/// !!! 断言不能违背事实（不能出现运行时报错） !!!
let d4 = 123;
(d4 as any as number[]).push(123);

// 确定赋值断言

let d5!: number;
function f() {
  d5 = 123;
}
f();
d5.toFixed();

// 常量断言
// 缩小类型范围

let d6 = {
  a: 1,
  b: false,
  c: "",
} as const;

// 函数类型
// 如何定义函数类型（参数类型+返回值类型）
// 类型和函数的逻辑是混合在一起的
function sum(a: number, b: number): number {
  return a + b;
}
const sum1 = (a: number, b: number): number => a + b;
// 函数类型和函数的逻辑分离
type SUM2 = (x: number, y: number) => number;
const sum2: SUM2 = (a, b) => a + b;
const sum3: (x: number, y: number) => number = (a, b) => a + b;
// void表示不具备返回值
function echo(a: string, b: string): void {
  console.log(a + b);
}
const echo1 = (a: string, b: string): void => {
  console.log(a + b);
};
const echo2: (a: string, b: string) => void = (a, b) => {
  console.log(a + b);
};

// 可选参数 可选参数后面不能有必传参
function print(a: number, b?: string, c?: boolean): void {}
// 默认参数 可选参数和参数默认值是互斥的
function print1(a: number = 1, b: string = "", c?: boolean): void {}
// 剩余参数
// 将所有参数收集为一个数组 给数字数组类型 => 函数有若干个参数 并且所有参数类型为number
function print2(...rest: number[]) {}
function print3(a: string, ...rest: number[]) {}

// 函数的重载（overload）
// 在函数参数类型或个数不同的情况下 同一函数具备不同的功能
// attr(el, attrName)
// attr(el, attrName, attrValue)
// attr(div, "id")
// attr(div, "id", "abc")
const app = document.getElementById("app");
function attr(el: HTMLElement, attrName: keyof HTMLElement): string | null;
function attr(
  el: HTMLElement,
  attrName: keyof HTMLElement,
  attrValue: string
): undefined;
function attr(
  el: HTMLElement,
  attrName: keyof HTMLElement,
  attrValue?: string
): string | null | undefined {
  if (typeof attrValue === "undefined") {
    return el.getAttribute(attrName);
  } else {
    el.setAttribute(attrName, attrValue);
  }
}
// 传递参数有2种情况
// 返回值有3种情况
// 6种

// attr(app as HTMLElement, "id");
// attr(app as HTMLElement, "id", "abc");
attr(app!, "id");

// 定义一个函数bar 一个参数可以为数字也可以为字符串 返回值为传入的数据
function bar(val: number): number;
function bar(val: string): string;
function bar(val: number | string): number | string {
  return val;
}
// number => number
// number => string
// string => number
// string => string
bar(1).toFixed(1);
bar("").indexOf("a");

// 函数类型的兼容性（包容关系）
// 控制变量法

function fn(a: () => void) {}
fn(() => {});
// void 表示没有主动使用return关键字
// undefined return undefined
let f1: () => undefined | number | void = () => {};
f1 = () => {
  console.log(123);
  return 1;
};
// 不考虑参数类型的情况下，函数的类型的兼容性由返回值的兼容关系决定（协变）
let f2: () => number | string;
f2 = () => "";

let f3!: (a: number) => undefined;
let f4!: (a: 1) => undefined;

// 不考虑返回值类型的情况下，函数的类型的兼容性与参数的兼容相反（协变）
// f3 = f4;
// f4 = f3;

let f5!: (a: 1, b: boolean, c: number[]) => {};
let f6!: (a: number, b: boolean) => { a: number; b: boolean };
// {a: number, b: boolean}

f5 = f6;

app!.addEventListener("click", () => {
  return 1234;
});

app!.addEventListener("click", (e) => {
  console.log(e);
  return 1234;
});

app!.addEventListener("click", (e) => {
  console.log(e, a);
  return 1234;
});

// 参数逆变 返回值协变！

/// !!! 泛型 ！！！
// 泛型 类型参数
function summary(a: number, b: number): number {
  return a + b;
}
summary(2, 3);

type ZYB<T> = {
  name: "张义博";
  age: number;
  gender: boolean;
  gf: T;
};
let zyb: ZYB<{
  a: string;
  b: string;
}> = {
  name: "张义博",
  age: 18,
  gender: true,
  gf: {
    a: "",
    b: "",
  },
};

// 泛型类型
type RES<T> = {
  code: number;
  msg: string;
  data: T;
};
// 泛型默认值
type RES1<T = null> = {
  code: number;
  msg: string;
  data: T;
};
// 泛型约束 extends
type RES2<
  U extends 200 | 201 | 301 | 304 | 400 | 401 | 500,
  T extends any[] = number[]
> = {
  code: U;
  msg: string;
  data: T;
};

let res2: RES1 = {
  code: 100,
  msg: "fail",
  data: null,
};
let res3: RES2<200> = {
  code: 200,
  msg: "success",
  data: [1, 2, 3],
};

// 泛型接口
interface Response<T> {
  code: number;
  msg: string;
  data: T;
}
// 泛型默认值
interface Response1<T = 1[]> {
  code: number;
  msg: string;
  data: T;
}

let res1: RES<number[]> = {
  code: 200,
  msg: "请求成功",
  data: [1, 2, 3],
};

// 泛型函数
// 定义一个函数foo 具备一个参数 参数类型为任意类型 返回值类型和参数类型相同
function foo<T>(param: T): T {
  return param;
}
// 泛型函数中所有的相同的泛型如果在任意的一个位置确定了其具体的类型 那么所有位置类型全部确定
foo("");

// 定义一个函数 getValue 第一个参数为纯对象 第二个参数为第一个参数的任意key 返回值为对象的key的值
function getValue<T extends {}, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
getValue({ a: 1, b: 2, c: 3 } as const, "a");

export default {};
