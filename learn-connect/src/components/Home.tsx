import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
type Props = RouteComponentProps;
export default class Home extends React.Component<Props> {
    render() {
        return (
            <div>
                <p>HOME</p>
                <button onClick={() => this.props.history.push('/counter')}>/counter</button>
                <Link to="/counter">/counter</Link>
            </div>
        )
    }
}
/**
 * 1.可以通过Link来跳转
 * 2.通过属性对象中的history对象实现跳转
 * 3.通过派发动作的方式实现跳转 store.dispatch(action);
 * connected-react-router 有两大功效
 * 1. 可以通过向仓库派发动作的方式实现路由的跳转, 通过中间件routeMiddleWare
 * 2. 每当路径发生变化的时候，都可以把最新的路径存放到仓库中去,以便随时在仓库中获取数据
 Synchronize router state with redux store through uni-direction flow
 同步路径状态  使用redux仓库 通过统一方向的流动
 */