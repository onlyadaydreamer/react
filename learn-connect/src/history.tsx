import { createHashHistory } from 'history';
let history = createHashHistory();
export default history;
//整个项目中所有的地方只要用到了history，都要使用这个history