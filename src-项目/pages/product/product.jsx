import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductAddUpdate from "./add-update"
import ProductHome from "./home"
import ProductDetail from "./detail"
import "./product.less"
// 商品管理

export default class Product extends Component {
   render(){
     return (
        <Switch>
          <Route path="/product" exact component={ProductHome}></Route>
          <Route path="/product/addupdate" component={ProductAddUpdate}></Route>
          <Route path="/product/detail" component={ProductDetail}></Route>
          <Redirect to="/product"/>
        </Switch>
      )
   }
  }