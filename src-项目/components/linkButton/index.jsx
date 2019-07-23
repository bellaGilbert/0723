import React from "react"
import "./index.less"
// 自定义看似链接实质是button的组件 
//...将接受所有的属性传递给子标签
//children 标签属性
//字符串 <LinkButton>xxxx</LinkButton>
//   标签对象 <LinkButton><span>  </span></LinkButton>
//  标签对象的数组<LinkButton> <span>  </span> <span>  </span> <span>  </span></LinkButton>
export default  function  LinkButton(props) {
     return <button className="link-button
     " {...props}/>
}