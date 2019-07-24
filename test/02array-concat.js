import { prototype } from "events";
import { func } from "../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/@types/prop-types";
import { thisExpression } from "@babel/types";

//  1. concat(...values): 将n个数组或值与当前数组合并生成一个新数组
// 如: [1, 2].concat([3, 4], 6) ==> [1, 2, 3, 4, 6]
// 2. slice(begin [, end]): 返回一个由 begin 和 end 决定的原数组的浅拷贝, 原始数组不会被改变
//   如: [1, 3, 5, 7, 9].slice(1, 3) ==> [3, 5]
// *********concat
Array.prototype.conca = function (...value){
    // 声明一个空数组
   let arr = []
    // 将当前数组中所有元素都保存在新数组中
   arr.push(...value)
    // 如果没有指定参数直接返回arr
   if(value.length===0){
        return arr
    }
    // 将values中所有数据依次添加到数组中
   value.forEach(value=>{
       // value是数组
     if(Array.isArray(value)){
        arr.push(...value)
     }else{ // value不是数组
        arr.push(value)   
       }
  })
     return arr
  }
  //    数组中的slice的方法
   Array.prototype.slice = function (start,end){
      const arr =[]
  //   如果当前数组是空数组
     if(this.length===0){
        return arr
      }
     
  // 处理start的特殊请求
  start = start||0 
    if(start <0){
        start = 0
    }else if(start>=this.length){
        return arr
    }
  //处理end的特殊情况
  end = end || this.length
   if(end>=this.length){
       end = this.length
   }else if(end<=start){
     return start
   }
//  遍历下标在start end之前所有元素 添加到arr中
for(let index = start ; index < end ;index++){
   arr.push(this[index])
}
return arr
}