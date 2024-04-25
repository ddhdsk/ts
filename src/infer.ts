// !!! infer 推导 !!!
// 类似于js的解构赋值（针对的是值）
let arr = [1, false];
let [a, b] = arr;
// infer 类型推断（针对的是类型）
// 泛型约束了A必须是一个数组类型
// 当你的类型数组的长度大于等于1 则
type T1<A extends any[]> = A extends [infer B, ...unknown[]] ? B : never;
type T2 = T1<[number, boolean, string]>;
type T3<A extends any[]> = A extends [any, infer B, ...unknown[]] ? B : never;
type T4 = T3<[number, boolean, string]>;
type T5<A extends any[]> = A extends [infer B, any, infer C, ...any[]]
  ? [B, C]
  : never;

type T6 = T5<[number, boolean, string]>;
type T7 = T5<[number, boolean]>;
type T8<A extends any[]> = A extends [...any[], infer L] ? L : never;
type T9 = T8<[number, boolean]>;

// 定义一个工具类型Pop<T>可以删除数组类型的最后一个类型 并返回删除后的数组类型
type Pop<T extends any[]> = T extends [...infer X, any] ? X : never;
type T10 = Pop<[1, 2, 3, 4]>;
// 定义一个工具类型Shift
type Shift<T extends any[]> = T extends []
  ? []
  : T extends [any, ...infer U]
  ? U
  : never;

type T11 = Shift<[]>;
type T12 = Shift<[1, 2, 3]>;

// 字符串模式匹配 类型推导
// 定义一个StartsWith工具类型
type StartsWith<A extends string, B extends string> = A extends `${B}${string}`
  ? true
  : false;
type T13 = StartsWith<"abc", "a">;
type T14 = StartsWith<"abc", "b">;
//
type T16<A extends string> = A extends `${infer B}_${infer C}` ? [B, C] : A;
type T15 = T16<"abc_def">; // ["abc","def"]
type T17 = T16<"abcdef">; // ["abc","def"]
// 函数
// 请定义一个GetReturnType工具类型 获取任意函数的返回值类型
type GetReturnType<F extends (...rest: any[]) => any> = F extends (
  ...rest: any[]
) => infer R
  ? R
  : never;

type T18 = GetReturnType<() => boolean>;

// GetFirstParam
type GetFirstParam<F extends (...rest: any[]) => any> = F extends (
  ...rest: [infer A, ...any[]]
) => any
  ? A
  : never;
type T119 = GetFirstParam<(a: number, b: string) => void>;
type GetLastParam<F extends (...args: any) => any> = F extends (
  ...args: infer Params
) => any
  ? Params extends []
    ? never
    : Params extends [...infer Rest, infer Last]
    ? Last
    : never
  : never;

// 测试用例
type T111 = GetLastParam<(x: number, y: string) => void>; // 应该推断出 string
type T222 = GetLastParam<() => void>; // 应该推断出 never

// GetParams
type GetParams<F extends (...rest: any[]) => any> = F extends (
  ...rest: infer P
) => any
  ? P
  : never;

type T19 = GetParams<(a: number, b: string) => void>;

// 映射类型
type ToReadOnly<T extends {}> = {
  readonly [key in keyof T]: T[key];
};
// 映射类型加深
// Filter筛选属性对应的值的类型 满足某种条件
// in操作符中 如果你对key有额外的条件限制 则需要使用as跟条件
type Filter<A extends {}, B> = {
  [key in keyof A as A[key] extends B ? key : never]: A[key];
};
type T20 = Filter<{ a: number; b: boolean; c: number[] }, number | boolean>;
// { a: number; b: boolean;}

type RepeatKey<T extends {}> = {
  [key in keyof T as key extends string ? `${key}${key}` : never]: T[key];
};
type T21 = RepeatKey<{ a: number; b: boolean; c: number[] }>;
// {aa: number, bb:boolean, cc: number[]}

export default {};
