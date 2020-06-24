import React, { Component,useState,memo,useMemo,useCallback,useReducer } from 'react'
import reducer from './reducer'
class Counter extends Component {
  state = {number:0}
  handleClick = ()=>{
      this.setState({number:this.state.number+1});
  }
  componentDidMount(){
      setTimeout(()=>{
          alert(this.state.number);
      },3000);
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
function Counter2(){
    let [number,setNumber] = useState(0);
    return (
        <div>
          <p>{number}</p>
          <button onClick={()=>setNumber(number+1)}>+</button>
        </div>
      )
}
//每一次渲染都是独立的闭包
function Counter3(){
    let [number,setNumber] = useState(0);
    function alertNumber(){
        setTimeout(function(){
            alert(number);
        },3000);
    }
    return (
        <div>
          <p>{number}</p>
          <button onClick={()=>setNumber(number+1)}>直接加1</button>
          <button onClick={alertNumber}>+</button>
        </div>
      )
}
function Counter4(){
    let [number,setNumber] = useState();
    function lazy(){
        setTimeout(function(){
           setNumber(oldVal=>oldVal+1);
        },3000);
    }
    return (
        <div>
          <p>{number}</p>
          <button onClick={()=>setNumber(number+1)}>直接加1</button>
          <button onClick={lazy}>lazy+1</button>
        </div>
      )
}
function Counter5({initialVal=0}){
    let [data,setData] = useState(function(){
        return {number:initialVal}//{number:0}
    });
    return (
        <div>
          <p>{data.number}</p>
          <button onClick={()=>setData({number:data.number+1})}>直接加1</button>
        </div>
      )
}
function Counter6({initialVal=0}){
    const [counter,setCounter] = useState({name:'计数器',number:0});
    console.log('Counter6 render');
    //setState会合并状态对象 但是我们的useState不会
    return (
        <div>
          <p>{counter.name}: {counter.number}</p>
          <button onClick={()=>setCounter({number:counter.number+1})}>直接加1</button>
          <button onClick={()=>setCounter(counter)}>传入老状态</button>
        </div>
      )
}
//引入两个hooks useCallback useMemo
function Counter7({initialVal=0}){
    const [counter,setCounter] = useState({name:'计数器',number:0});
    console.log('Counter6 render');
    //setState会合并状态对象 但是我们的useState不会
    return (
        <div>
          <p>{counter.name}: {counter.number}</p>
          <button onClick={()=>setCounter({number:counter.number+1})}>直接加1</button>
          <button onClick={()=>setCounter(counter)}>传入老状态</button>
        </div>
      )
}
//1.保证如果number没有变化，则addClick和data也不要变化
//2.子Child组件要加一个判断，如果说属性没有变则不需要刷新
function Child({data,addClick}){
    console.log('Child render');
    return (
        <button onClick={addClick}>{data.number}</button>
    )
}
Child = memo(Child);
let add1,data1;
function App(){
   const [number,setNumber] = useState(0);
   const [name,setName] = useState('计数器');
   const addClick = useCallback(()=> setNumber(number+1),[number]);//函数
   console.log('add1===addClick',add1===addClick);
   add1=addClick;
   const data = useMemo(()=>({number}),[number]);//对象
   console.log('data1===data',data1===data);
   data1=data;
   console.log('App render');
   return (
       <div>
           <input value={name} onChange={event=>setName(event.target.value)}/>
           父:{number}
           <Child data={data} addClick={addClick}/>
       </div>
   )

}
const INCREMENT = 'INCREMENT';
const DECREMENT= 'DECREMENT';

function Counter8(){
    let [state1,dispatch1] =useReducer(reducer,5,function(initialVal){
        return {number:initialVal}
    });
    let [state2,dispatch2] =useReducer(reducer,10,function(initialVal){
        return {number:initialVal}
    });
    return (
        <>
         <p>{state1.number}</p>
         <button onClick={()=>dispatch1({type:INCREMENT})}>+</button>
         <button onClick={()=>dispatch1({type:DECREMENT})}>-</button>
         <hr/>
         <p>{state2.number}</p>
         <button onClick={()=>dispatch2({type:INCREMENT})}>+</button>
         <button onClick={()=>dispatch2({type:DECREMENT})}>-</button>
        </>
    )
}



export default Counter8;