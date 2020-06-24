import compose from './compose';
import { Middleware, Store, MiddlewareAPI, Action, Dispatch, StoreEnhancer, StoreCreator, Reducer } from './';
import { AnyAction } from './types';
export function applyMiddleware<Ext, S = any>(
    ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer 
export default function applyMiddleware<Ext, S>(
    ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer {
    return (createStore: StoreCreator) => <S, A extends Action>(
        reducer: Reducer<S, A>): Store<S, A> => {
        //'AnyAction' is assignable to the constraint of type 'A'
        // Store<S, A>  dispatch: Dispatch<A>=><T extends A>(action: T) => T
        let store = createStore(reducer);
        let dispatch: Dispatch<AnyAction>;//这个时候还是undefined
        const middlewareAPI: MiddlewareAPI<Dispatch, S> = {
            getState: store.getState,
            dispatch: (action) => dispatch(action) // 这个dispatch就是最终的那个dispatch函数，在下面被赋值
        }
        // 如果只有两个中间件的写法：
        // middleware1 = middleware1(middlewareAPI);
        // middleware2 = middleware2(middlewareAPI);
        // dispatch = middleware1(middleware2(store.dispatch));
        const chain = middlewares.map((middleware: any) => middleware(middlewareAPI));// 二级函数组成的数组
        dispatch = compose(...chain)(store.dispatch);// 把store.dispatch作为next传递给最后一个函数，执行后把得到的三级函数向上传...,得到最终的一个函数，然后执行这个函数
        return {
            ...store,
            dispatch
        };
    }
}
