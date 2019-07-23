  

import React, { Component } from 'react'
import {connect} from "react-redux"
import Counter from "../components/counter"
import { dispatch } from 'rxjs/internal/observable/pairs';
import {increment,decrement} from "../actions"
// 应用根组件 通过包装UI组件*(counter)生成容器组件
// 容器组件 通过counect chan
// 将特定state数据映射（转换）成标签一般属性传递给UI组件（Counter)
// redux在调用此函数时，传入了store。getState的值
const mapStateToprops =(state)=>({//返回对象的所有组件都会传给ui组件
    count:state,
})
// 将包含dispatch函数调用语局的函数映射为函数属性传递给ui组件
const mapDispatchToProps =(dispatch)=>({
    increment:(number)=>{dispatch(increment(number))},
    decrement:(number)=>{dispatch(decrement(number))}
})

export default connect(
    mapStateToprops,//用来传递那些一般数属性  回调函数
    mapDispatchToProps//用来传递那些函数属性
)(Counter)

