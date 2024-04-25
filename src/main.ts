import axios from "axios";
import "./home.js";
// 如果你需要使用某一个ts文件中定义的类型
// 1.该ts文件中不存在模块化语法 则可以直接使用（所有的自定义类型和接口都是全局的！）
// 1.该ts文件中存在模块化语法 则需要将你使用自定义类型和接口导出 然后再导入使用（所有的自定义类型和接口都是有作用域的！）
export interface User {
  name: string;
  age: number;
}
console.log(a);
console.log(b.age);
c(123);

$.c("");
