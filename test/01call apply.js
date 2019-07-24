// 区别call()/apply()/bind()
// 2. 自定义call()/apply(): ...
// 3. 自定义实现bind()
// 自定义call()
Function.prototype.call() =function(obj){
  const args = [...arguments].filter((item,index)=>index>0)

      obj.tempFn = this
      obj.tempFn(...args)
      delete obj.tempFn//删除属性
  }
//   自定义apply
Function.prototype.apply()=function(obj){
    obj.tempFn = this//将当前函数保存到obj 对象上
    obj.tempFn(...args)//当前函数执行，内部的this是obj
    delete obj.tempFn
}
// 自定义bind()
Function.prototype.bind() = function(obj){
    obj=obj || window
    const args =[]
    if(arguments.length>1){
        for(let i = 1; i < arguments.length;i++){
           args.push(arguments[i]) 
        }
    }
    // 调用原来函数并指定this为obj  指定实参为args
    self.apply(obj,args)
}