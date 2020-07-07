import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ContentLoader from 'react-content-loader';
//ReactDOM.render(<ContentLoader/>,document.getElementById('root'));
// 把一个组件变成一个字符串
let html = ReactDOMServer.renderToStaticMarkup(<ContentLoader/>);
//html就是一个svg图片
export default html;//es6 默认导出