import { setTimeout } from "core-js";
import { tryStatement } from "@babel/types";
import { func } from "../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/@types/prop-types";

(function(window){
    // 构造promise
    function Promise(excutor){
        const self = this//用来缓存this
        self.status = "pending"//初始状态为pending
        self.data = undefined//初始值为未定义
        self.callbacks = []//用来储存回调函数的
        // 用来指定promise成功的状态和成功的value
        // 1). 指定status改为'resolved'
        // 2). 指定data为value
        // 3). 可能需要去执行已保存的待执行成功的回调函数
        function reslove(value){
            if(self.status==="pending"){
                return 
            }
          //指定成功状态为resolve
           self.status = "resolve"
           //成功状态的值为value
           self.data = value
          //   可能需要去执行已保存的待执行成功的回调函数
           if(self.callbacks.length > 0){
              setTimeout(()=>{//需要使用宏观队列 表示是
                self.callbacks.forEach(callbackobj=>{
                  callbackobj.reslove(value)//即使数据和回调函数都有了, 也需要将回调函数放到回调队列中执行
                },0)
              })
           }  
           }
           function reject(reason){
              if(self.status==="pending"){
                  return
              }
            //指定状态为reject
            self.status = reject
            // 指定数据为reason
            self.data = reason
            //  可能需要去执行已保存的待执行失败的回调函数
            if(self.callbacks.length > 0){
                setTimeout(()=>{
                   self.callbacks.forEach(callbackobj=>{
                       callbackobj.reject(reason)
                   })
                },0)
            }
            }
            // 立即同步执行器函数（去启动异步任务）
            try {
                excutor(reslove,reject)
            } catch (error) {
                reject(error)
            }
            // 用来指定成功和失败的回调函数的方法
            Promise.prototype.then= function(onResolved,onRejected){
               const self = this
               return new Promise ((resolve,reject)=>{
                //   调用传入的成功/失败的回调, 执行后根据结果来确定返回的promise的结果 
                 function handle(callback){
                     try{
                        const result = self.data
                //   result 是promise
                        if(result instanceof Promise){
                            result.then(
                                value=>{
                                    resolve(value)
                                },
                                reason=>{
                                    reject(reason)
                                }
                            )
                          //result.then(resolve,reject) 
                        }else{
                            resolve(result)//result 不是peomise
                        }
                     }catch(error){
                         reject(error)
                     }
                 } 
                 if(self.status==="resolved"){//已经成共了
                    // 进行异步处理
                    setTimeout(()=>{
                       handle(onResolved)
                    },0)

                 }else if(self.status ==="rejected"){
                    //  进行失败的异步处理
                    setTimeout(()=>{
                       handle(onRejected)
                    },0)
                 }else{//pending还未确定
                //  向promise中的callback保存两个待执行的回调函数
                    this.callback.push({
                        onResloved:(value)=>{
                            // 进行成功处理
                            handle(onResolved)
                        },
                        onRejected:(reason)=>{
                        //    进行失败处理
                            handle(onRejected)
                        }
                    })
                    

                 }
              })   
            }
            // 1. 用来指定成功和失败回调函数的方法
            // 2. 返回一个新的promise, 这个promise由成功或者失败回调执行的结果来决定
            Promise.prototype.then2=function(onResolved,onRejected){
            //   指定onResolved与onRejected的默认值
                onResolved = typeof onResolved ==="function" ? onResolved : value=>value 
                onRejected = typeof onRejected ==="function" ? onRejected: {throw:reason}
              
                const self = this
              return new Promise((resolve,reject)=>{
                   //   调用传入的成功/失败的回调, 执行后根据结果来确定返回的promise的结果
                  function handle (callback){
                    try {
                        const result = self.data
                        // result是promise
                        if(result instanceof Promise){
                            result.then(
                               value=>{
                                  resolve(value)
                               },
                               reason=>{
                                   reject(value)
                               } 
                            )
                            // result.then(resolved,rejected)
                        }else{
                          // result不是promise
                          resolve(value)
                        }                       

                    } catch (error) {
                      reject(error)   
                    }
                  } 
                //   已经成功了
                if(self.status==="resolved"){
                    // 进行异步处理
                    setTimeout(()=>{
                       handle(onResolved)
                    },0)
                   //进行异步失败处理                  
                }else if(self.status==="rejected"){
                    setTimeout(()=>{
                        handle(onRejected)
                    },0) 
                }else{
                //pending还未确定
                //  向promise中的callback保存两个待执行的回调函数
                 this.callbacks.push({
                    //  进形成功处理
                     onResloved(){
                         handle(onResolved)
                     },
                    // 进行失败处理
                    onRejected(){
                        handle(onRejected)
                    }
                 })
                }
              })

            }
            //   用来指定失败回调函数的方法
            Promise.prototype.catch = function (onRejected){
                return this.then(null,onRejected)
            }
            // 用来返回一个成功/失败的promise的静态方法
            Promise.resolve = function(value){
                return new Promise((resolve,reject)=>{
                    if(value instanceof Promise){
                        value.then(resolve,reject)
                    }else{
                        reslove(value)
                    }
                })
            }
            // 用来指定失败回调函数的方法
            Promise.resolveDelay = function(value,time){
                return new Promise((resolve,reject)=>{
                   setTimeout(()=>{
                       if(value instanceof Promise){
                           value.then(resolve,reject)
                       }else{
                           resolve(value)
                       }
                   },time)
                })
            }
            // 用来返回一个失败的promise的静态方法
            Promise.reject = function(reason){
                return new Promise((resolve,reject)=>{
                   reject(reason)
                })
            }
            //用来返回一个成功的promise的静态方法

            Promise.rejectDelay = function (reason,time){
                return new Promise((reslove,reject)=>{
                   setTimeout(()=>{
                      reject(season)
                   },time)
                })
            }
    }
})()