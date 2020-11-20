/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-05-09 22:15:34
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-27 21:14:48
 */

import React, {
  Component,
  useState,
  memo,
  useMemo,
  useCallback,
  useReducer,
} from 'react';
import reducer from './reducer';
class Counter extends Component {
  state = { number: 0 };
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };
  componentDidMount() {
    setTimeout(() => {
      alert(this.state.number);
    }, 3000);
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
function Counter2() {
  let [number, setNumber] = useState(0);
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </div>
  );
}
//每一次渲染都是独立的闭包
function Counter3() {
  let [number, setNumber] = useState(0);
  function alertNumber() {
    setTimeout(function () {
      alert(number); //
    }, 3000);
  }
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>直接加1</button>
      <button onClick={alertNumber}>+</button>
    </div>
  );
}
// 函数式更新
function Counter4() {
  let [number, setNumber] = useState();
  function lazy() {
    setTimeout(function () {
      setNumber((oldVal) => oldVal + 1); // 这样每次都会取最新的number, setNumber是异步的
    }, 3000);
  }
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>直接加1</button>
      <button onClick={lazy}>lazy+1</button>
    </div>
  );
}
// 惰性初始化就是useState中传入的是一个函数，当使用到某个状态的时候才会执行
function Counter5({ initialVal = 0 }) {
  let [data, setData] = useState(function () {
    return { number: initialVal }; //{number:0}
  });
  return (
    <div>
      <p>{data.number}</p>
      <button onClick={() => setData({ number: data.number + 1 })}>
        直接加1
      </button>
    </div>
  );
}
// 性能优化：如果传递的是老状态那么就什么都不做
function Counter6({ initialVal = 0 }) {
  const [counter, setCounter] = useState({ name: '计数器', number: 0 });
  console.log('Counter6 render');
  //setState会合并状态对象 但是我们的useState不会
  return (
    <div>
      <p>
        {counter.name}: {counter.number}
      </p>
      <button onClick={() => setCounter({ number: counter.number + 1 })}>
        直接加1
      </button>
      <button onClick={() => setCounter(counter)}>传入老状态</button>
    </div>
  );
}
//引入两个hooks useCallback useMemo
function Counter7({ initialVal = 0 }) {
  const [counter, setCounter] = useState({ name: '计数器', number: 0 });
  console.log('Counter6 render');
  //setState会合并状态对象 但是我们的useState不会
  return (
    <div>
      <p>
        {counter.name}: {counter.number}
      </p>
      <button onClick={() => setCounter({ number: counter.number + 1 })}>
        直接加1
      </button>
      <button onClick={() => setCounter(counter)}>传入老状态</button>
    </div>
  );
}

// useMemo useCallback
// 想要Child不是每次都渲染需要：
//1.保证如果number没有变化，则addClick和data也不要变化（默认每次渲染addClick和data都是新的)
//2.子Child组件要加一个判断，如果说属性没有变则不需要刷新
function Child({ data, addClick }) {
  console.log('Child render');
  return <button onClick={addClick}>{data.number}</button>;
}
Child = memo(Child); // 新组件就有了一个新的功能，如果属性不变则不重新渲染
let add1, data1;
function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('计数器');
  const addClick = useCallback(() => setNumber(number + 1), [number]); //保证每次渲染的addClick都是一样的, 因为依赖的number不变, 如果number变了，那addClick就变了
  console.log('add1===addClick', add1 === addClick); //
  add1 = addClick;
  const data = useMemo(() => ({ number }), [number]); // 保证每次渲染的data都是一样的， 因为依赖的number不变, 如果number变了，那data就变了。如果不传依赖项那就和data = {number}没有区别
  console.log('data1===data', data1 === data);
  data1 = data;
  console.log('App render');
  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      父:{number}
      <Child data={data} addClick={addClick} /> //
      每次name改变就不会触发Child重新渲染
    </div>
  );
}
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function Counter8() {
  /**
   * @description:
   * @param reducer函数；初始值； 获取初始值的方法，返回的结果作为初始值
   * @return:
   */
  let [state1, dispatch1] = useReducer(reducer, 5, function (initialVal) {
    return { number: initialVal };
  });
  let [state2, dispatch2] = useReducer(reducer, 10, function (initialVal) {
    return { number: initialVal };
  });
  return (
    <>
      <p>{state1.number}</p>
      <button onClick={() => dispatch1({ type: INCREMENT })}>+</button>
      <button onClick={() => dispatch1({ type: DECREMENT })}>-</button>
      <hr />
      <p>{state2.number}</p>
      <button onClick={() => dispatch2({ type: INCREMENT })}>+</button>
      <button onClick={() => dispatch2({ type: DECREMENT })}>-</button>
    </>
  );
}

export default {
  App,
  Counter,
  Counter2,
  Counter3,
  Counter4,
  Counter5,
  Counter6,
  Counter8,
};
