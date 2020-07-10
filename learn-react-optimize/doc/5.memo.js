/**
 * @file: description
 * @author: zhangxing
 * @Date: 2020-07-07 16:47:20
* @LastEditors: zhangxing
* @LastEditTime: 2020-07-09 09:35:20
 */
// 内部实际上还是使用了PureComponent
function memo(Func) {
  class Proxy extends PureComponent {
    render() {
      return <Func {...this.props} />;
    }
  }
  return Proxy;
}
const Title = memo((props) => {
  console.log("Title render");
  return <p>{props.title}</p>;
});
