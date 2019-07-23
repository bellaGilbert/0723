import React,{Component} from "react"
import ReactDOM from "react-dom"
import App from "./App"
import store from "./store"
ReactDOM.render(<App store={store}/>,document.getElementById("root"))  
// 绑定监视store内部状态数据改变的监听
store.subscribe(()=>{//从新渲染
 ReactDOM.render(<App store={store}/>,document.getElementById("root"))
}) 
// ppppggggg
// ddsc