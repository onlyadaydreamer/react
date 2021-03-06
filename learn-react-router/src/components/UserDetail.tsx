/**
 * @file: description
 * @author: zhangxing
 * @Date: 2019-11-17 16:29:37
 * @LastEditors: zhangxing
 * @LastEditTime: 2020-06-21 20:57:07
 */
import React, { Component } from 'react';
import { Link, RouteComponentProps } from '../react-router-dom';
import { User } from '../types';
//路径参数  
// path: /user/detail/:id/:name  
// url: /user/detail/111/222 
// 路径参数对象params: {id:'111',name:'222'}
interface Params {
    id: string;
}
// props.match.params.id;  match就是路径和path的匹配结果
type Props = RouteComponentProps<Params>;

interface State {
    user: User
}
export default class extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { user: {} as User};// 断言
    }
    componentDidMount() {
        //先尝试从location的state中取值
        let user: User = this.props.location.state;
        if (!user) {
            let usersString = localStorage.getItem('users');
            let users = usersString ? JSON.parse(usersString) : [];
            user = users.find((item: User) => item.id === this.props.match.params.id);
        }
        this.setState({ user });
    }
    render() {
        return (
            <div>
                <p>ID:{this.state.user.id}</p>
                <p>用户名:{this.state.user.username}</p>
                <p>邮箱:{this.state.user.email}</p>
            </div>
        )
    }

}