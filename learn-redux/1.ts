// 函数兼容性
let x: string | number = 10;
let y: string = 'string';
//x = y;
//y = x;


export interface Action {
    type: string;
}
export interface NameAction extends Action {
    name: string;
}
export interface AgeAction extends Action {
    age: number;
}
export interface AllAction extends Action {
    name: string;
    //age: number;
}
let nameAction: NameAction;
let ageAction: AgeAction;
let allAction: AllAction;
/* nameAction = ageAction;
ageAction = nameAction;*/
//一定要记住， 在TS更考虑的是兼容性，就是我要的东西你有没有，如果我要的东西你有，就OK
nameAction = allAction;
allAction = nameAction;
