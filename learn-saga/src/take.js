
let EventEmitter = require('events');
let e = new EventEmitter();
//在sagaMiddleware内部里有co库的
function take(actionType) {
    return {
        type: 'Take',
        actionType
    }
}
function* rootSaga() {
    console.log('开始执行了');
    yield take('INCREMENT');
    console.log("after take('INCREMENT')");
}
let it = rootSaga();
let result = it.next();
let { done, value } = result;
console.log(done, value);
if (value.type === 'Take') {
    e.once(value.actionType, () => it.next());
}
e.emit(value.actionType);

