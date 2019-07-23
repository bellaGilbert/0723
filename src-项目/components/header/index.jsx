import React, { Component } from 'react'
import memoryUtils from "../../utils/memoryUtils"
import {Modal,Button} from "antd"
import "./header.less"
import {withRouter} from "react-router-dom"
import storageUtils from "../../utils/storageUtils"
import menuList from "../../config/menuConfig"
import {formateDate} from '../../utils/dataUtils'
import {reqWeather} from "../../api/index.js"
import LinkButton from '../linkButton';
 class Header extends Component {
    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl:"",//图片
        weather:"",//天气文本
    }
    // 退出登陆
    logout = ()=>{
    // 显示确认显示
    Modal.confirm({
        title: '确认退出吗',
        content: 'Some descriptions',
        onOk:()=>{
          console.log('OK');
          // 确定后，删除用户信息
          //local  内存中 的
          storageUtils.removeUser();
          memoryUtils.user = {}
          //跳转到登陆页面 
          this.props.history.replace("/login")
        }, 
        onCancel() {
          console.log('Cancel');
        },
      })
    // 确定后，删除用户信息

    } 
    
    // 根据当前请求的path得到对应的title
 
    getTitle=()=>{
      let title="";
      const path = this.props.location.pathname;
      menuList.forEach(item=>{
        if(item.key===path){
            title = item.title
        }else if(item.children){
          // ?????????????????????????????????????????????????????????///
          const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
            if(cItem){
                title = cItem.title
            }
        }
      })
      return title
    }
    //获取天气信息显示
    getWeather=async()=>{
    //通过发送的请求获取数据
     const {dayPictureUrl,weather} = await reqWeather("北京")
     //更新状态
     this.setState({
        dayPictureUrl,weather
     })
    }

   componentDidMount(){
    //   启动定时器
    this.intervaId =setInterval(()=>{
        // 将currentTime更新为当前时间值
        this.setState({
            currentTime:formateDate(Date.now())
        })
       },1000)
      //发jsonp 请求获取天气信息显示
      this.getWeather()
   }

    componentWillUnmount(){
    //清除定时器
    clearInterval(this.intervarId)
    }

    render(){
        const {currentTime, dayPictureUrl,weather} = this.state;
        // const user = memoryUtils.user
        // 得到当前取到的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    欢迎，{memoryUtils.user.username}
                    <LinkButton  onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                     <div className="header-bottom-right">
                     <span>{currentTime}</span>
                     <img src={dayPictureUrl} alt="weather"/>
                     <span>{weather}</span>
                     </div>
                     
                </div>
            </div>
        )
    }
}
export default withRouter(Header)