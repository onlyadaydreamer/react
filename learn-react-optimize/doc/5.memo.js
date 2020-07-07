/**
 * @file: description
 * @author: zhangxing
 * @Date: 2020-07-07 16:47:20
* @LastEditors: zhangxing
* @LastEditTime: 2020-07-07 16:49:20
 */
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
