import React, { Component } from 'react'
import {Card,Button,Icon,Table, message,Modal} from "antd"
import LinkButton from '../../components/linkButton';
import {reqCategorys,reqAddCategory,reqUpdateCategory} from "../../api"
import  AddUpdateForm from './add-update-form'
export default class Category extends Component {
  

  // 分类管理
  state ={
    categorys:[],//所有分类的数组
    loading:false,//是否正在请求加载中
    showStatus:0,//0代表不显示，1代表添加，2代表修改
    
  }

   //初始化table的所有列信息的数组 
   initColumns=()=>{
        this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        render: (category)=><LinkButton onClick={()=>{
          // 保存当前分类，其他地方都可以读取？？？？？？？？？？？？
          this.category= category 
        this.setState({showStatus:2})
        }}>修改分类</LinkButton>,
        width:200
      },
      
    ]
}

// 获取分类类别
getCategorys=async()=>{
  // 发请求之前显示true
  this.setState({loading:true})
  // 发送Ajax请求
  const result = await reqCategorys();
  console.log(result)
  //  隐藏loading
  this.setState({loading:false})
  if(result.status===0){
    // 取出分类列表
    const categorys = result.data
    //更新状态数据
  this.setState({
    categorys
  })
  }else{
    message.error("获取分类失败")
  }
}  








// 点击确定的回调   t 添加或者修改
handleOk=()=>{
//进行表单验证
this.form.validateFields(async(err, values) => {
  if (!err) {
//验证通过后，得到输入数据 
   const {categoryName} = values

   const {showStatus } = this.state
    let result 
    if(showStatus === 1){
      // 发添加分类的请求
      result = await reqAddCategory(categoryName)
        }else{
  //修改请求
          const categoryId = this.category._id
          console.log(categoryId)
          result = await reqUpdateCategory({categoryId,categoryName}) 
          }
          // 重置输入数据 变为初始值
          this.form.resetFields()//??????重置
          this.setState({showStatus:0})
          const action = showStatus ===1?"添加":"修改"
          //根据响应结果做不同的处理
          if(result.status==0){
            // 重新获取分类列表显示
            this.getCategorys()
          // console.log(this.getCategorys())
            message.success(action+"添加分类成功")
          }else{
            message.error(action+"添加分类失败")
            }

            }
          });


}



// 点击取消回调
handleCancel=()=>{
  this.form.resetFields()
  this.setState({
    showStatus:0
  })
}

  componentWillMount(){
    this.initColumns();
    
  }
  componentDidMount(){
    this.getCategorys()
  }


    render() {
      //  取出状态数据
      const {categorys,loading,showStatus} = this.state
      //读取更新的分类名称
      const category = this.category || {}
      const extra = (
        <Button type="primary" onClick={()=>{
          this.category ={}
          this.setState({showStatus:1})}}>
            {/* ???????????????????????? */}
           <Icon type="plus"/>
                 添加
         </Button>
        )
            return (
            <Card  extra={extra}>
              <Table 
                bordered={true}
                rowKey="_id"
                columns={this.columns}
                loading={loading}
                dataSource={categorys}
                pagination={{defaultPageSize:5, showQuickJumper:true}}
              />
              <Modal
                    title={showStatus ===1 ? "添加分类":"修改分类"}
                    visible={showStatus!==0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
              >
                    {/* 将子组件传过来的对象保存到当前组件对象上*/}
                 <AddUpdateForm setForm={form=> this.form = form} categoryName={category.name}/>
                 </Modal>
             </Card>
            )
        }
    }
