import { __values } from "tslib";
import { Result } from "antd";
import { func } from "prop-types";

// 自定义promise
(function (window){
 function Promise(excutor){
     const self = this//把this指向缓存起来
     self.status = "pending"  //  初始化属性
     self.data = undefined //用户储存结果数据的属性，初始值为undefined，代表现在还没有属性
     self.callbacks = []//用来储存指向失败和成功的回调数组的容器  {onResolved(){} onReject(){}}
    //  用来指定promise成功的状态和成功的value
    //  1). 指定status改为'resolved'
    //  2). 指定data为value
    //  3). 可能需要去执行已保存的待执行成功的回调函数
    function resolve(value){
    //  如果状态不是pending 直接结束
     if(self.status!="pending"){
         return
     }
        // 指定状态为resolved
        self.status = "resolved"
        // 指定data值为value
        self.data = value
        // 可能需要去执行已保存的执行成功的回调函数
        // 回调函数必须是异步
        if(self.callbacks.length>0){
            setTimeout(()=>{//需要使用微队列进行
              self.callbacks.forEach(callbackobj=>{//因为微观队列太麻烦 简单使用宏观队列
                 callbackobj.onResolved(value)//即使回调函数和数据都有了，也需要将回调函数放到回调队列中
             }) 
            },0)
        }    
    }

    // 用来指定promise失败的状态和失败的reason
    // 1).指定status改为 'rejected'
    // 2).指定data为reason
    // 3).可能需要去执行已保存的待执行失败的回调函数
    function reject(reason){
        if(self.status="pending")
        // 指定状态为rejected
        self.status = "rejected"
        // 指定状态为reason
        self.data = reason
        // 可能需要去执行已保存的执行失败的回调函数
        if(self.callbacks.length > 0){
           setTimeout(()=>{
             self.callbacks.forEach(callbackobj=>{
                callbackobj.onReject(reason)
            })
          },0)
       }
     }
    //  立即同步执行器函数（去启动异步任务）
        try {
           excutor(resolve,reject) 
              } catch (error) {
           reject (error)//一旦执行器执行抛出异常，promise变为失败，且结果为error
    }
 }
//  用来指定成功和失败回调函数的方法
    Promise.prototype.then = function (onResolved,onRejected){
        const self = this   
        return new Promise((resolve,reject)=>{
        //调用传入的成功/失败的回调，执行后根据结果来确定返回的promise的结果 
        function handle(callback){
        try {
        const result = callback(self.data)
            if(result instanceof Promise){
        //    result.then(
        //        value=>{
        //         resolve(value)   
        //        },
        //        reason=>{
        //        reject(reason)    
        //        }
        //    )
            result.then(resolve,reject)   
            }else{//result 不是promise 直接返回成功
                resolve(result)
            }
        
            }catch (error) {
            reject(error)
            }  
        } 
        if(self.status=="resolved"){//已经成功了
        // 进行成功的异步处理
        setTimeout(()=>{
         handle(onResolved)
        },0)      
        }else if(self.status==="rejected"){
        //  进行失败的异步处理
         setTimeout(()=>{
             handle(onRejected)
         },0)
        }else{//pending 还未确定
        //向promise中的callbacks中保存两个待执行的回调函数  ?????????????  
        this.callbacks.push({
            onResolved:(value)=>{
        //进行成功处理
              handle(onResolved) 
            },
           onRejected:(reason)=>{
        //进行失败处理
              handle(onRejected)
           } 
        })

    }
})

//   1. 用来指定成功和失败回调函数的方法
//   2. 返回一个新的promise, 这个promise由成功或者失败回调执行的结果来决定
    Promise.prototype.then=function(onResolved,onRejected){
       const self = this
    //指定onResolved与onRejected//??????????????????????????????????
    onResolved = typeof onResolved === "function" ? onResolved : value =>value;//让promise返回成功 值为 value

    onReject = typeof onRejected === "function" ? onRejected :reason =>{throw reason}  ;//让promise返回失败的值  为 reason
    return new Promise((resolve,reject)=>{
       function handle (callback){
           try {
              const result = callback(self.data)
              if(result instanceof Promise){
                  result.then
              } 
           } catch (error) {
               
           }
       }
    }) 
    }
}
} )


