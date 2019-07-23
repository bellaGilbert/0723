  

import React, { Component } from 'react'
import PropTypes from "prop-types"
// import{INCREMENT,DECREMENT}from './action-types'

// 应用根组件
// UI组件 负责下显示 （c初始显示和更新显示）

class Counter  extends Component {
  static propTypes ={
    count: PropTypes.number.isRequired,
    increment:PropTypes.func.isRequired,
    decrement:PropTypes.func.isRequired
}
  


    increment=()=>{
      const number = this.refs.numberSelect.value*1
    //   this.props.store.dispatch(increment(number)) ??????
      this.props.increment(number)
    }
    decrement=()=>{
        const number = this.refs.numberSelect.value*1
        console.log(this.props.decrement)
        this.props.decrement(number)
    }
    incrementIfOdd=()=>{
        const number = this.refs.numberSelect.value*1
        // const count = this.props.store.getState()//????????????
        const count = this.props.count//?????
        if(count%2===1){            
             this.props.increment(number)
        }
        
    }
    incrementAsync=()=>{
        const number = this.refs.numberSelect.value*1
        setTimeout(()=>{            
            this.props.increment(number)
        },1000)
    }


    render() {
        console.log("App render()")
        const count = this.props.count//??????????????
        return (
            <div>
                <p>click{count}times</p>&nbsp;
                  <select ref="numberSelect">
                     <option value="1">1 </option>
                     <option value="2">2 </option>
                     <option value="3">3 </option>
                     
                  </select>&nbsp;
                  <button onClick={this.increment}>+</button> &nbsp;    
                  <button onClick={this.decrement}>-</button> &nbsp;    
                  <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;     
                  <button onClick={this.incrementAsync}>increment async</button>     
            </div>
        )
    }
}
export default Counter