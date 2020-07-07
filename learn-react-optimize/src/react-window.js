import React from 'react';
export class FixedSizeList extends React.Component{
    constructor(){
        super();
        this.containerRef = React.createRef();
    }
    state = {start:0}//要显示的元素的起始索引 0~4 
    componentDidMount(){
        this.containerRef.current.addEventListener('scroll',()=>{
            let scrollTop = this.containerRef.current.scrollTop;
            let start = Math.floor(scrollTop/this.props.itemSize);
            this.setState({start});
        });
    }
    render(){
        let {width,height,itemSize,itemCount} = this.props;
        //width height list宽度和高度 itemSize itemCount 条目的高度和条数的总数量
        let children = [];
        let pageSize = Math.floor(height/itemSize)+1;
        let itemStyle = {height:itemSize,width:'100%',position:'absolute',left:0,top:0};
        for(let i=this.state.start;i<this.state.start+pageSize;i++){
            let style = {...itemStyle,top:i*itemSize};//0 30px 60px
            children.push(this.props.children({index:i,style}));
        }
        let containerStyle = {width,height,position:'relative',overflow:'auto'};
        return (
            <div style={containerStyle} ref={this.containerRef}>
                <div style={{width:'100%',height:itemSize*itemCount}}>
                  {children}
                </div>
            </div>
        )
    }
}