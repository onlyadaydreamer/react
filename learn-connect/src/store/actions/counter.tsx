import * as types from '../action-types';
import { push } from '../../connected-react-router';
export default {
    increment() {
        return { type: types.INCREMENT };
    },
    goto(path: string) {
        //Link 
        //history.push();
        //{type:call_history_method,payload:{method:'push',args:[location]}}
        return push({ pathname: path });
    }
}