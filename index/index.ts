import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
let user = { name: "simon", age: 18 };
const _user = _.cloneDeep(user);
// 类型声明文件(.d.ts)作用是让js文件也获得良好的类型提示（ts兼容js的方案）

// typescript内置类型（简单类型、引用类型、DOM、BOM 构造函数名称就是其类型名称、善于利用ts的类型推导）
// 第三方库中定义的类型 (善于利用ts的类型推导)
// 自己定义的类型
let x1: Window = window;
let x2: Location = location;
let x3: History = history;
let x4: HTMLDivElement;

let p = document.getElementsByTagName("p")[0];
let span = document.getElementsByTagName("span")[0];
let h = history;
let p1: HTMLParagraphElement;

type A = Promise<AxiosResponse<any, any>>;
axios
  .get<{
    code: number;
    msg: string;
    data: { name: string; age: number }[];
  }>("/user")
  .then((res) => {
    console.log(
      res.data.data.forEach((item) => {
        console.log(item.name);
      })
    );
  });

// get<any, AxiosResponse<any, any>, any>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
// 1. get函数是一个泛型函数
// 2. 该函数具备三个泛型
// 3. 泛型默认值分别是 any, AxiosResponse<any, any>, any

// get<1, AxiosResponse<1, any>, any>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<1, any>>

// AxiosResponse<1, any>
