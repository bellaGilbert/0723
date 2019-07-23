import React, { Component } from 'react'
import {Link,withRouter} from "react-router-dom"
import "./index.less"
import logo from "../../assets/images/logo.png"
import {Menu,Icon} from "antd"
import menuList from "../../config/menuConfig"
import { product } from 'simple-statistics';
const {SubMenu} = Menu;
// 左侧导航
 class LeftNav extends Component {
getMenuNodes2=(menuList)=>{
    // 请求的路径
    const path = this.props.location.pathname
    return menuList.reduce((pre,item)=>{
        //可能向pre添加<Menu.item>  
        if(!item.children){
            pre.push((
               <Menu.Item key={item.key}>
                <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
                </Link>                        
                </Menu.Item>
                ))
        }else{
             // 判断当前item的KEY是否是我需要的openkey
            // 查找 item 的所有children中cItem的key,看是否有一个跟i请求的payh匹配
            const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
            if(cItem){
                this.openKey = item.key
            }
            pre.push((
            <SubMenu
                key={item.key}
                title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                  </span>
                }
            >  
            {
               this.getMenuNodes2(item.children)
            }                  
            </SubMenu>
            ))
        }  
        // 可能向pre添加<Submenu>  
        return pre
    },[])

}
    // 根据指定menu数组生成Item和SubMenu的数组
    // map+递归
    getMenuNodes=(menuList)=>{
      return menuList.map(item=>{
     
          if(!item.children){
            return  (
                <Menu.Item key={item.key}>
                <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
                </Link>                        
                </Menu.Item>
            )
          }else{
            return  ( //下一级菜单
                <SubMenu
                    key={item.key}
                    title={
                    <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </span>
                    }
                >  
                {
                    this.getMenuNodes(item.children)
                }                  
                </SubMenu>
                )
          } 
         })    
    }

//   第一次render()之前执行一次
//   为第一次render()做一些同步的准备工作
//   */
 componentWillMount () {
    this.menuNodes = this.getMenuNodes2(menuList)
   } 
    render() {
        // 得到当前请求的路由路径
        let selectKey = this.props.location.pathname
        // 让商品管理大字显示出来
        if(selectKey.indexOf("/product")===0){
            selectKey="/product"
        }
        return (
            <div className="left-nav"> 
                <Link className="left-nav-link" to="/home"> 
                  <img src={logo} alt="logo"/>
                  <h1>硅谷后台</h1>
                </Link>
                <Menu 
                    defaultSelectedKeys={[selectKey]}  
                    defaultOpenKeys={[this.openKey]}    
                    mode="inline"
                    theme="dark"
                 >                   
                  {this.menuNodes }
                </Menu> 
            </div>
        )
    }
}
// 向往暴漏的是高阶组件 来包装非路由组件
export default withRouter(LeftNav)