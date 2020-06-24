## combineReducer
- 只有一个仓库
- 仓库里只有一个状态，只能一个reducer

很多组件，很多组件都有自己的数据。如果所有的状态、所有的动作处理都放在一个reducer里的话会非常难以维护

我们可写很多个reducer,然后每个reducer维护自己的小状态/分状态，然后由combineReducer这个方法进行合并

##  bindActionCreator 绑定一个
把actionCreator 和 dispatch 方法绑定在一起， 函数体从返回一个action变成派发这个action，这样我们就不用再写store.dispatch()

例如：
下面的increment就是一个actionCreator
```js
let increment = () => {
    return {type: INCREMENT}
}
```
调用bindActionCreator方法后返回的函数就变成了
```js
let increment () => {
    store.dispatch({type: INCREMENT})
}
```

而bindActionCreators就是bindActionCreator的复数集合。

## react-redux
连接react和redux
## connected-react-router
连接路由和redux

## redux中间件
redux中action都是同步的。异步操作只能通过中间件来处理， 派发的时候可以加入中间件的逻辑

中间件的原理是什么？

就是一个替换，用自己写的dispatch方法替换store.dispatch方法, 这个dispatch方法是通过compose而来。

next就是中间件返回的二级函数
