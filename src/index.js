import React,{Component} from "react"
import ReactDOM from "react-dom"
import App from "./containers/App"
import store from "./store"
import {Provider} from "react-redux"
ReactDOM.render(
    // 会将接收到store对象提供给所有的容器组件
    <Provider  store={store}>
       <App/>
    </Provider>
    ,document.getElementById("root")

)  

