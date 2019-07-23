import React, { Component } from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types'
import htmlToDraft from "html-to-draftjs"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import _ from "lodash"//防抖函数



export default class RichTextEditor extends Component {
    static propTypes = {
        detail:PropTypes.string
    }
  state = {
    editorState: EditorState.createEmpty(),
  }

  componentWillMount(){
     const detail = this.props.detail 
    //   根据detail生成一个editorstate
    if(detail){
    const contentBlock = htmlToDraft(detail);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState); 
   // 更新状态
    this.setState ( {
       editorState
      })
    }
   
  }


// 返回的函数 一个防抖函数                处理事件  进行包装
onEditorStateChange =_.debounce( (editorState) => {
    console.log("-------------")
    this.setState({
      editorState,
    });
  },500)

 uploadImageCallBack = (file)=> {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');//图片上传接口
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);//{status:0,data:{}}
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
getDetail=()=> draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{height:200,border:"1px solid black", paddingLeft:10}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        {/* <textarea/> 生成对应标签语法
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div> 
    );
  }
}
