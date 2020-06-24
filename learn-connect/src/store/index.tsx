import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from './reducers';
import { routerMiddleware } from '../connected-react-router';
import history from '../history';
//let store = createStore(rootReducer);
//routerMiddleware其实是在监听你派发的action,如果派发action它能识别的话，会进行路径路径的跳转
let store = applyMiddleware(routerMiddleware(history))(createStore)(rootReducer);
declare global {
    interface Window {
        store: Store
    }
}

window.store = store;
export default store;

/* let storeEnhancer = applyMiddleware(routerMiddleware(history));
let storeEnhancerStoreCreator = storeEnhancer(createStore);
let store = storeEnhancerStoreCreator(rootReducer); */