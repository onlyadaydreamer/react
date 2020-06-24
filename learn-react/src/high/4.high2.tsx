import React, { Component } from 'react';
import ReactDOM from 'react-dom';
interface ComponentProps {
    value: string
}
interface State {
    value: string
}
//自定义hooks就可以解决高阶组件嵌套，包装过深的问题
const fromLocal = (OldComponent: React.FC<ComponentProps> | React.ComponentClass<ComponentProps>) => {
    return class extends React.Component<ComponentProps, State> {
        state = { value: '' }
        componentDidMount() {
            let value = localStorage.getItem(this.props.value);//username=>zhangsan
            if (value) {
                this.setState({ value });
            }
        }
        render() {
            return <OldComponent value={this.state.value} />
        }
    }
}
const fromAjax = (OldComponent: React.FC<ComponentProps>) => {
    return class extends React.Component<ComponentProps, State> {
        state = { value: '' }// 张三
        componentDidMount() {
            fetch('/name.json').then(response => response.json()).then(result => {
                this.setState({
                    //this.props.value=zhangsan 
                    value: result[this.props.value]
                });
            });
        }
        render() {
            return <OldComponent value={this.state.value} />
        }
    }
}
//希望这个组件能从localStorage中取到username这个字段的值  
const UserName = (props: ComponentProps) => {
    return <input defaultValue={props.value} />
}
const FromAjaxUserName = fromAjax(UserName);
//Argument of type 'typeof (Anonymous class)' is not assignable to parameter of type 'FunctionComponent<ComponentProps>'.
const FromLocalUsername = fromLocal(FromAjaxUserName);
ReactDOM.render(< FromLocalUsername value="username" />, document.getElementById('root'));