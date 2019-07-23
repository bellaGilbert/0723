import { switchCase } from "@babel/types";

// 正在管理状态数据的函数
// 根据老的state和action 产生新的state
export default function count(state,action){
  switch(action.type){
    case "INCERMENT":
       return state+action.data 
    case "DECERMENT":
      return state - action.number      
    default://产生初始状态值
      return state  
  }
  return
 }
