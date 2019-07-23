import React,{Component} from "react"
import { Redirect } from 'react-router-dom'
import {Form,Input,Icon,Button,message} from "antd";
// import logo from "./images/logo.png"
import "./login.less"
import {reqLogin} from "../../api"
import memoryUtils from "../../utils/memoryUtils.js"
import logo from "../../assets/images/logo.png"

const Item = Form.Item
 class Login extends Component{
    handleSubmit=e=>{
        //阻止事件默认行为  阻止表单的提交
    e.preventDefault();
    // 对表单所有字段进行统一验证
    this.props.form.validateFields(async(err,{username,password})=>{
        if(!err){
            // alert(2)
     //  const promise = reqLogin(username,password)//????
         const result = await reqLogin(username,password)
        //  登陆成功
        if(result.status===0){
       // 将user信息保存到local
       const user = result.data 
       //   将对象转换成字符串
       localStorage.setItem("user_key",JSON.stringify(user))
       //保存在内存中
       memoryUtils.user = user  
       //  跳转到管理界面
        this.props.history.replace("/")
        message.success("登陆成功")
       //登陆失败  
        }else{
          message.error(result.msg)
        }
        }else{
            alert("验证失败")
        }
    })
    
    }
    //  对密码进行验证
    validatePwd=(rule,value,callback)=>{
        value = value.trim();
        if(!value){
            callback("密码必须输入")
        }else if(value.length<4){
            callback("密码不能小于4位")
        }else if(value.length>12){
            callback("密码不能大于12位")
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("密码必须是英文，数字或下划线组成")
        }else{
            callback()//验证通过
        }

        
    }

    render(){
        // 读取保存的user, 如果存在, 直接跳转到管理界面
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memoryUtils.user
        if(user._id){
            return<Redirect to="/"/>
        }
   

        const {getFieldDecorator}=this.props.form
        return(
          <div className="login">
             <div className="login-header">
                <img src={logo} alt="logo"/>
                <h1>React项目：后台管理系统</h1>   
             </div>
             <div className="login-content">
              <h3>用户登陆</h3>
              <Form onSubmit={this.handleSubmit} className="login-form">
                  <Item>
                      {
                         getFieldDecorator('username', { // 配置对象: 属性名是一些特定的名称
                            initialValue: '', // 初始值
                            rules:[
                                // 必须输入
                                //必须大于等于4
                                // 必须小于等于12
                                // 必须是英文,数字 下划线 组成
                                {required:true,message:"用户名是必须的"},
                                {min:4,message:"用户名不能小于4位"},
                                {max:12,message:"用户名不能大于12位"},
                                {pattern:/^[a-zA-Z0-9_]+$/,message:"用户名必须是英文，下划线组成"}
                            ]          

                      })(
                      <Input prefix={<Icon type="user" style={{color:"rgba(0,0,0,.25)"}}/>}
                      placeholder="用户名"/>)
                      }
                  </Item>  
                  <Item>
                      {
                          getFieldDecorator("password",{
                              initialValue:"",
                              rules:[
                                  {validator:this.validatePwd}
                              ]
                          })(                      
                      <Input prefix={<Icon type="lock" style={{color:"rgba(0,0,0,.25)"}}/>}
                       type="password" placeholder="密码"/>
                          )
                          }
                          
                  </Item>   
                  <Item>
                      <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}> 
                          登陆
                      </Button>
                  </Item>
              </Form> 
          </div> 
        </div>)
    }
}
const WrapperForm = Form.create()(Login)
export default WrapperForm 



