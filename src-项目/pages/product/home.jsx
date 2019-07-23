import React, { Component } from 'react'
import {Card,Icon,Input,Table,Select,Button, message} from "antd"
import LinkButton from "../../components/linkButton"
import {reqProducts, reqSearchProducts,reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from "../../utils/contants.js"
import memoryUtils from "../../utils/memoryUtils.js"
// 包装事件函数，生成节流函数
import throttle from "lodash.throttle"
const Option = Select.Option
export default class ProductHome extends Component {
    state={
        loading:false,
        products:[ ],//商品列表
        total:0,//商品的总数量
        searchType:"productName",//默认是按商品名称搜索
        searchName:"",//按关键字搜索
    }

    updateStatus=throttle(async(productId,status)=>{
      // 计算更新后的值
      status = status===1?2:1;//????????????????????
      // 请求更新
      const result = await reqUpdateStatus(productId,status)
      if(result.status===0){
        message.success('更新商品状态成功')
      //获取商标第几页
      this.getProducts(this.pageNum)

      }
    },2000)
    initColumns=()=>{
      this.columns = [
        {
          title:"商品名称",
          dataIndex:"name"  
        },
        {
            title:"商品描述",
            dataIndex:"desc"  
        },
        {
            title:"商品价格",
            dataIndex:"price",
            render:(price)=> "￥"+ price

        },
        {
            title:"状态",
            width:100,
            // dataIndex:"status",
            //product  
            //product.status
            //product._id
            render:({_id,status}) =>{
                let btnText = "下架"
                let text = "在售"
              if(status===2){
                 btnText = "上架"
                 text="已下架"
              }
              return(               
                <span>
                <button onClick={()=>{this.updateStatus(_id,status)}}>{btnText}</button><br/>>
                <span>{text}</span>
                </span>
              )               
            }
        },
        {
           title:"操作",
           width:100,
           render:(product)=>(
            <span>
            <LinkButton
             onClick={()=>{
              //  在内存中保存product
               memoryUtils.product = product
               this.props.history.push("/product/detail")
              }}
              >
              详情
              </LinkButton>
             
            <LinkButton
              onClick={()=>{
                //  在内存中保存product
                 memoryUtils.product = product
                 this.props.history.push("/product/addupdate")
                }}

            >修改
            
            </LinkButton>
        </span>
           )
           },           
        
      ]
    }
    // 异步获取指定页面商品列表显示
    getProducts=async(pageNum)=>{
      //保存当前页码
      this.pageNum= pageNum
        const {searchName,searchType} = this.state  
        let result
        // 发送请求获取数据
        if(!this.isSearch){
          //一般分页请求
             result = await reqProducts(pageNum,PAGE_SIZE)
        }else{ 
            // 搜索分页请求???????????????????????????????????????????????????????????/
             result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchType,searchName})
             this.isSearch = false    
         }
        
        
        if(result.status===0){
        // 取出数据
        const {total,list} =result.data 
        this.setState({
            products:list,
            total
        })
        }
        }
    componentWillMount(){
      this.initColumns()
    }
    componentDidMount(){
      // 获取第一页显示
      this.getProducts(1)
    }
    render() {
      
      const {loading,products,total,searchType,searchName}   = this.state
      const title=(
        <span>
          <Select
           style={{width:200}} 
           value={searchType} 
           onChange={(value)=>{this.setState({searchType:value})}}>
            <Option value="productName">按名称搜索</Option>
            <Option value="productDesc">按描述搜索</Option>  
         </Select>
         <Input 
           style={{width:200 ,margin:"0 10px"}} 
           placeholder="关键字"
           value={searchName}
           onChange={(event)=>this.setState({searchName:event.target.value})}
           />
           <Button type="primary" onClick={() =>{
              this.isSearch = true//保存搜索的标记
              this.getProducts(1) }
           } >搜索</Button>
        </span>
         )
         const extra=(//????????????????????????????????????????///为啥要在这里写路径  路径为什么是这个
             <Button type="primary" onClick={()=>{
               memoryUtils.product={}
               this.props.history.push("/product/addupdate")
               }}>
                <Icon type="plus"/>
                 添加商品
             </Button>
         )
         return (
          <Card title={title} extra={extra}>
             <Table
              bordered={true}
              rowKey="_id"
              loading={loading}
              columns={this.columns}//列 商品内容
              dataSource={products}//商品列表
              pagination={{total:total,defaultPageSize:PAGE_SIZE,showQuickJumper:true,onChange:this.getProducts,current:this.pageNum}}//?????????????
             />   
          </Card>
        )
    }
}




