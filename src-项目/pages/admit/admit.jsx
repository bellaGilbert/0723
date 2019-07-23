import React,{Component} from "react"
import {Layout} from "antd"
import {Redirect,Switch,Route} from "react-router-dom"
import  memoryUtils  from "../../utils/memoryUtils"
import LeftNav from "../../components/left-nav"
import Header from "../../components/header"
import Home from "../home/home"
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'



const {Footer,Sider,Content} = Layout;

export default class Admit extends Component{
    render(){
       // 读取保存的user，如果不存在 直接跳转到 登陆页面
       const user = memoryUtils.user
       if(!user._id){
        //   自动跳转到指定路由
        return <Redirect to="/login"/>
       }
      return (
          <Layout style={{height:"100%"}}>
              <Sider >
                  <LeftNav/>
              </Sider>
              <Layout>
                  <Header/>
                  <Content style={{margin:"20px"}}>
                  <Switch>
                      <Route path={"/home"} component={Home}/>
                      <Route path='/category' component={Category}/>
                      <Route path='/product' component={Product}/>
                      <Route path='/role' component={Role}/>
                      <Route path='/user' component={User}/>
                      <Route path='/charts/bar' component={Bar}/>
                      <Route path='/charts/line' component={Line}/>
                      <Route path='/charts/pie' component={Pie}/>
                      <Redirect to='/home'/>

                      
                  </Switch>
                 </Content>
                  <Footer style={{textAlign:"center","rgba":(0,0,0,0.5)}}>推荐使用谷歌浏览器，可以获得更加页面操作</Footer>
              </Layout>
          </Layout>
      ) 
      }} 
    
