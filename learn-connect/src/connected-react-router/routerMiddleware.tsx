
import { History } from 'history';
import { CALL_HISTORY_METHOD } from './';
export default function (history: History) {
    return function (api: any) {
        return function (next: any) {
            return function (action: any) {
                //如果相等说明派发的这个动作就是 store.dispatch(push({pathname:'/'}));
                if (action.type === CALL_HISTORY_METHOD) {
                    let method: 'push' | 'go' = action.payload.method;
                    history[method](action.payload.args[0]);
                } else {
                    next(action);
                }
            }
        }
    }
}