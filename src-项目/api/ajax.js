// 封装能发ajax 请求
import axios from "axios"
import qs from "qs"
import {message} from "antd"
// 拦截器   在请求前处理    请求拦截器 让data成为urleacode形式
 axios.interceptors.request.use(function(config){
    //得到请求体和请求方式
    const {method,data} = config;
    //处理post请求，将data数据转成query字符串
    if(method.toLowerCase()==="post" && typeof data==="object"){
       config.data =  qs.stringify(data)
       console.log(1)
    }
    return config;
 })
 
//  添加响应拦截器  在请求返回之后  且在我们指定的请求响应回调函数之前
// 让请求成功的结果不在是response 而是response.data的值
axios.interceptors.response.use(function(response){
   // 返回的结果就会交给我们指定的请求响应的回调 
   return response.data;
},function(error){
   message.error("请求出错"+error.message)
//   alert("response interceptor error")
   // return Promise.reject(error)
   return new Promise(()=>{})
});
export default axios