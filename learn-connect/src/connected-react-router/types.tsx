import { LocationState, Location } from 'history';
export const CALL_HISTORY_METHOD: '@@router/CALL_HISTORY_METHOD' = '@@router/CALL_HISTORY_METHOD';
export const LOCATION_CHANGE: '@@router/LOCATION_CHANGE' = '@@router/LOCATION_CHANGE';
export interface LocationActionPayload<A = any[]> {
    method: string;
    args?: A;
}
//这是一个调用历史对象方法的action
//告诉 中间件，我要调用history对象的方法 method args   history[method](...args);
export interface CallHistoryMethodAction<A = any[]> {
    type: typeof CALL_HISTORY_METHOD;
    payload: LocationActionPayload<A>;
}

export interface LocationChangeAction<S = LocationState> {
    type: typeof LOCATION_CHANGE;
    payload: LocationChangePayload<S>;
}
export interface LocationChangePayload<S = LocationState> extends RouterState<S> {
    isFirstRendering: boolean;
}
export type Action = 'PUSH' | 'POP' | 'REPLACE';
export type RouterActionType = Action;
export interface RouterState<S = LocationState> {
    location: Location<S>
    action: RouterActionType
}