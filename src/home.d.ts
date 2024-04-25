declare var a: number;
declare var b: { name: string; age: number };
declare function c<T>(arg: T): T;
declare namespace $ {
  var a: number;
  var b: boolean;
  function c<T>(v: T): T;
}
