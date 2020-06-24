import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { Router } from 'react-router';
import { History, Location, UnregisterCallback } from 'history';
import { LOCATION_CHANGE, Action } from './';
//react-router-dom
/**
 * 这个组件的主要工作就是订阅路径变化事件，当路径发生变化后向仓库派发动作
 * 改变仓库状态对象的router属性
 */
interface Props {
    history: History
}
export default class ConnectedRouter extends React.Component<Props> {
    static contextType = ReactReduxContext;
    unListen: UnregisterCallback
    componentDidMount() {
        //调用history的listen方法进行监听，监听路径的变化 ，当路径发生变化之后会执行此监听函数，
        this.unListen = this.props.history.listen((location: Location, action: Action) => {
            this.context.store.dispatch({
                type: LOCATION_CHANGE,
                payload: {
                    location,
                    action
                }
            })
        });
    }
    componentWillUnmount() {
        this.unListen();
    }
    render() {
        let { history, children } = this.props;
        return (
            <Router history={history}>
                {children}
            </Router>
        )
    }
}