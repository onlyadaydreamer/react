/**
 * @file: description
 * @author: zhangxing
 * @Date: 2020-06-22 15:43:04
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-22 15:49:37
 */
type SC = <T, V>(a: T, b: V) => void;// 修饰函数

let s : SC = <T, V>(a: T, b: V) => {
    console.log(a, b);
}
s<string, string>('1', '2');// 调用函数的时候传入泛型类型


type SC2<T, V> = (a: T, b: V) => void;// 定义函数类型， 修饰函数类型
let s2: SC2<number, number> = (a: number, b: number) => {// 声明函数实现的时候就传入泛型类型
    console.log(a, b);
}
s2(1, 2);

// All files must be modules when the '--isolatedModules' flag is provided. 加上export
export {}