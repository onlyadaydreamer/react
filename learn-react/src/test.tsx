export {};
/**
 * 1.当你在TS中定义了一个类的时候，其实是定义两个东西
 * 一个是类的实例的类型
 */
class Dog {
  public name: string = "zhufeng";
  public age: number = 10;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
//Dog类的 实例的类型
let dog: Dog = {
  name: "zhufeng",
  age: 10,
};
//另外我们也创建了一个叫做 构造函数的值
//typeof Dog获得是构造函数的值的类型
let d1: typeof Dog = Dog;
new d1("zhufeng", 10);
