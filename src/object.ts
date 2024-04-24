// !!! 纯对象类型 ！！！
// 使用interface关键字定义对象类型
interface O1 {}
let o1: O1 = {
  a: 1,
};
interface O2 {
  name: string;
  age: number;
}
let o2: O2 = {
  name: "ts",
  age: 18,
};
interface O3 {
  name: string;
  age: number;
  gender?: boolean;
}
let o3: O3 = {
  name: "typescript",
  age: 18,
};

type O3Name = (typeof o3)["name"];
type O3Age = (typeof o3)["age"];
type O3Gender = (typeof o3)["gender"];
type O3All = (typeof o3)[keyof typeof o3];
// type O3All = (typeof o3)["name"|"age"|"gender"];
// type O3All = (typeof o3)["name"] | (typeof o3)["age"] | (typeof o3)["gender"];

// keyof T关键字的作用是将对象类型T的所有key计算一个联合类型
// keyof O3 ====> "name"|"age"|"gender"
// ts强大的功能：类型推导
let t1 = { a: 1, b: false, c: [] };
type T1 = keyof typeof t1; // "a"|"b"|"c"
// type T2 = { a: number, b: number, c: number }
// 类型转换（类型体操）
type T2 = {
  [key in "a" | "b" | "c"]: number;
};
type T3 = {
  [key in T1]: number;
};
// 主动
type T4 = {
  [key in keyof typeof t1]: number;
};
type T5 = {
  [key in keyof typeof t1]: (typeof t1)[keyof typeof t1];
};
// typeof、keyof、in
// 任意属性
// 被动
type T6 = {
  a: number;
  readonly b: string;
  // [key: string | number | symbol]: any;
  [key: keyof any]: number | string;
};
let t6: T6 = {
  a: 1,
  b: "",
  abc: 123,
};
// t6.b = "123";
// 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是任意属性的类型的子类型

type T7 = {
  a: null;
  b: undefined;
  c: boolean;
  d: string;
  e: number;
};
type T8 = {
  readonly [key in keyof T7]: T7[key];
};
type T9 = {
  [key in keyof T7]?: T7[key];
};
type T10 = {
  readonly [key in keyof T7]?: T7[key];
};
type T11 = {
  -readonly [key in keyof T7]-?: T7[key];
};

type T12 = {};
type T13 = {
  category: "phone";
};
type T14 = {
  category: "phone";
  brand: "huawei";
};
let t12: T12;
let t13: T13;
let t14: T14;
// t12 = t13;
// t12 = t14;
// t13 = t14;

type T15 = {
  a: number;
  b: string;
};
type T16 = {
  a: 1;
  c: boolean;
};

// T15和T16交叉类型（交集）求他们的公共子类型
type T17 = T15 & T16;

let t17: T17 = {
  a: 1,
  b: "",
  c: false,
};
// 对象类型A和B在交叉过程中 如果A和B中对属性不重叠则 相当于合并两个对象类型的所有属性组成一个新的类型
// 如果存在重叠属性 则将重叠属性不同的类型进行再次交叉

// 联合类型本质
type T18 = T15 | T16;
// { a: number;b: string;} ｜ {a: 1;c: boolean;}
let t18: T18 = {
  a: 1,
  // b: "",
  c: false,
};

// 如何给对象类型添加成员？？？

type T20 = {
  a: number;
};
type T21 = {
  b: string;
};
type T22 = {
  c: boolean;
};
type T23 = {
  d: undefined;
};
type T24 = {
  e: null;
};
type T25 = T20 & T21 & T22 & T23 & T24;
type T26 = keyof T25;

interface T30 {
  a: number;
}
interface T31 extends T30 {
  b: string;
}
interface T32 extends T31 {
  c: boolean;
}
interface T33 extends T32 {
  d: undefined;
}
interface T34 extends T33 {
  e: null;
}

interface T41 {
  a: number;
}
interface T41 {
  b: number;
}

// 在使用interface和type定义对象类型时，需要合并属性：
// 1. type 使用&交叉类型
// 2. interface 同名 则自动合并 不同名 使用extends手动继承

export default {};
