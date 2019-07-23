import React, { Component } from 'react'
import { Form,Input} from "antd"
import PropTypes  from "prop-types"
const Item = Form.Item
// 添加分类的form组件·

class AddUpdateForm extends Component {
  static propTypes={
    setForm:PropTypes.func.isRequired,
    categoryName:PropTypes.string,
  }
  componentWillMount(){
    // 将当前子组件的form对象通过函数交给了父组件
    this.props.setForm(this.props.form)
  }

    render() {
      const {categoryName} = this.props
      const {getFieldDecorator} =  this.props.form
        return (
            <Form>
                <Item>
                    {
                      getFieldDecorator('categoryName',{
                         initialValue:categoryName ||'',
                         rules:[
                             {required:true,message:"分类名称必须输入"}
                         ]
                      })(
                        <Input type="text" placeholder="请输入分类名称"></Input>
                      )  
                    }
                  </Item>
            </Form>
        )
    }
}

export default Form.create()(AddUpdateForm) 