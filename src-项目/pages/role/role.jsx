import React, { Component } from 'react'
import { Button, Card,Table }from "antd"

const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    
    },
    {
      title: '创建事件',
      className: 'column-money',
      dataIndex: 'money',
    },
    {
      title: '授权时间',
    //   dataIndex: 'address',
    },
    {
        title: '授权人',
        // dataIndex: 'address',
      },
      {
        title: '操作',
        // dataIndex: 'address',
        render: text => <a href="javascript:;">设置权限</a>,
      },
  ];
  
  const data = [
    {
      key: '1',
      name: 'test1',
      money: '￥300,000.00',
      address: '权限设置',
    },
    {
      key: '2',
      name: 'test2',
      money: '￥1,256,000.00',
      address: '权限设置',
    },
    {
      key: '3',
      name: 'test3',
      money: '￥120,000.00',
      address: '权限设置',
    },
  ];
  
export default class role extends Component {
    render() {
        return (
            <div>
            <Button type="primary">创建角色</Button>
            <Table

            columns={columns}
            dataSource={data}
            bordered
          
            
          />
          </div>
        )
    }
}
