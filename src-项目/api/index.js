// 包含应用中所有请求接口的函数：接口请求函数
import ajax from "./ajax";
import jsonp from "jsonp" //sxios  不能发送jsonp请求
import { message } from "antd";

const base = ""
//用小括号？？？
export const reqLogin = (username,password)=>ajax.post(base+"/login",{username,password})

// export function reqLogin(username,password){
//     const base = "http://localhost:3000"//???????????
    // let data ={username,password}
    // return 
// }  
// console.log(reqLogin('admin','admin'))

// ？？？？？？？？？？？？？？？
// const name = "admin"
// const pwd = "admin"  
// reqLogin(name,pwd).then(result=>{//response。data的值
//   // const result = response.date
//   console.log ("请求成功",result)

// })



// 发送jsonp获取天气信息
export const reqWeather=(city)=>{
 return new Promise((resolve,reject)=>{//执行异步任务  内部进行异步任务，成功了返回reslove,失败了返回reject
    const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`   
    jsonp(url,{},(error,data)=>{
        // 成功
        if(!error&&data.error===0){
           const {dayPictureUrl,weather} = data.results[0].weather_data[0]
           resolve({dayPictureUrl:dayPictureUrl,weather:weather})
        }else{
          message.error("获取天气信息失败")
        }
   
    })

 }) 

}
// 获取分类类表
// export  const reqCategorys=()=>ajax("/manage/category/list")
// export  const reqCategorys=()=>ajax({
//    method:"GET",
//    url:"/manage/category/list"
// })
   // export const reqCategorys=()=>ajax.get("/manage/category/list")
   export const reqCategorys = () => ajax(base + '/manage/category/list')

// 添加分类
   export const reqAddCategory=(categoryName)=>ajax.post("/manage/category/add",{
      categoryName
   })
// 修改分类                      ?????????????????????????{}
   export const reqUpdateCategory=({categoryId,categoryName})=>ajax.post("/manage/category/update",{
      categoryId,
      categoryName     
})
// 根据分类id获取分类
export const reqCategory = (categoryId) =>ajax("/manage/category/info",{
   params:{
      categoryId
   }
})
// export const reqCategoryid = (categoryId) => ajax(base + '/manage/category/info', {
//    params: {
//      categoryId
//    }
//  })
// 获取商品分页列表
export const reqProducts=(pageNum,pageSize)=>ajax("/manage/product/list",{
   params:{//包含所有query参数的对象
      pageNum,
      pageSize
   }
})
// 根据Name/desc搜索产品分页列表
export const reqSearchProducts=({
   pageNum,
   pageSize,
   searchName,
   searchType //他的值是productName  或者是 productDesc
})=>ajax(base+'/manage/product/search',{
   params:{
      pageNum,
      pageSize,
      [searchType]:searchName,
   }
})
// 对商品进行上架/下架处理
export const reqUpdateStatus = (productId,status)=>ajax(base+'/manage/product/updateStatus',{
  method:'POST',
  data:{
     productId,
     status
  }
})
 
export let reqDeleteImg = (name) =>ajax.post("/manage/img/delete",{name})

// 添加 修改商品
export const reqAddUpdateProduct =(product)=>ajax.post(
   "/manage/product/"+(product._id ? "update":"add"),
   product
   )
