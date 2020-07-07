import React,{useReducer,useContext,useState,useEffect,useCallback} from 'react'
import reducer from './reducer';
import * as types from './action-types';
import InfiniteScroll from 'react-infinite-scroller';
import qwest from 'qwest';
import {Spin} from 'antd';
import  'antd/lib/spin/style/css';
import './index.css';
const CounterContext1 = React.createContext();
const CounterContext2 = React.createContext();
//CounterContext={Provider,Consumer}
const Counter1 =  () => {
    let {state,dispatch} = useContext(CounterContext1);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={()=>dispatch({type:types.INCREMENT})}>+</button>
            <button onClick={()=>dispatch({type:types.DECREMENT})}>-</button>
        </div>
    )
}
const Counter2 =  () => {
    let {state,dispatch} = useContext(CounterContext2);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={()=>dispatch({type:types.INCREMENT})}>+</button>
            <button onClick={()=>dispatch({type:types.DECREMENT})}>-</button>
        </div>
    )
}
const Counter3 =  () => {
    return (
        <CounterContext2.Consumer>
            {
                value=>(
                   <>
                    <p>{value.state.number}</p>
                    <button onClick={()=>value.dispatch({type:types.INCREMENT})}>+</button>
                    <button onClick={()=>value.dispatch({type:types.DECREMENT})}>-</button>
                   </>
                )
            }
            
        </CounterContext2.Consumer>
    )
}

function App(){
    let [state,dispatch] = useReducer(reducer,{number:0});
    return (
        <>
        <CounterContext1.Provider value={{state,dispatch}}>
            <Counter1/>
        </CounterContext1.Provider>

        <CounterContext2.Provider value={{state,dispatch}}>
            <Counter2/>
            <Counter3/>
        </CounterContext2.Provider>
        </>
    )

}
/**
 * 1.原生react componentDidMount fetch setState
 * 2.redux 中间件派发一个函数 redux-thunk 
 * 3. 
 */
function Counter(){
    console.log('render Counter');
    let [number,setNumber] = useState(0);
    console.log(number);
    //会在每次渲染完成执行副使用
    useEffect(()=>{
      
    }, [number]);
    return (
        <div>
          <p>{number}</p>
          {/* <Child number={number}/> */}
          <button onClick={()=>setNumber(number+1)}>+</button>
        </div>
      )
}

function Child(props) {
    console.log('render Child');
    useEffect(() => {
        console.log('child');
    }, []);
    return (
        <div>{ props.number }</div>
    )
}


const api = {
    baseUrl: 'https://api.soundcloud.com',
    client_id: 'caf73ef1e709f839664ab82bef40fa96'
};

export function SFCFilteredDocs(props) {
    console.log('render');
    const [state, setState] = useState({
        tracks: [],
        hasMoreItems: true,
        nextHref: null
    });
    
    const loadItems = (page) => {

        var url = api.baseUrl + '/users/8665091/favorites';
        if(state.nextHref) {
            url = state.nextHref;
        }

        qwest.get(url, {
                client_id: api.client_id,
                linked_partitioning: 1,
                page_size: 1
            }, {
                cache: true
            })
            .then(function(xhr, resp) {
                if(resp) {
                    var tracks = state.tracks;
                    resp.collection.map((track) => {
                        if(track.artwork_url == null) {
                            track.artwork_url = track.user.avatar_url;
                        }

                        tracks.push(track);
                    });

                    if(resp.next_href) {
                        setState({
                            ...state,
                            tracks: tracks,
                            nextHref: resp.next_href
                        });
                    } else {
                        setState({
                            ...state,
                            hasMoreItems: false
                        });
                    }
                }
            });
    }

    const loader = <div className="loader">Loading ...</div>;

    
    var items = [];
    state.tracks.map((track, i) => {
        items.push(
            <div className="track" key={i}>
                <a href={track.permalink_url} target="_blank">
                    <img src={track.artwork_url} width="150" height="150" />
                    <p className="title">{track.title}</p>
                </a>
            </div>
        );
    });
    console.log(items);
    
    return (
        <div style={{height: 700, overflow: 'auto'}}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadItems}
          hasMore={state.hasMoreItems}
          loader={loader}
        >
            
                    {items}
                
        </InfiniteScroll>
        </div>
    );
}
export default SFCFilteredDocs;