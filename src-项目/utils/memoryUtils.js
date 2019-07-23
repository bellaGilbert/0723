import storageUtils from "./storageUtils"
// 初始时取一次并保存为user为了后面读取 是在缓存中读取，而不是location里面读取
// ？？？？？？？？？？？？？？？？？？？？？？？？？？
const user = storageUtils.getUser()
export default{
    // 用来储存用户登陆的信息
    user,
    product:{},//需要查看商品对象

}