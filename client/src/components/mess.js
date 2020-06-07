import React from 'react'
import moment  from 'moment'
import { Comment } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import '../css/chat.css'


const Mess = (props) =>{
    return(
        <Comment
        author={props.chat.username}
        avatar = {<UserOutlined />}
        content={props.chat.text}
        datetime={moment(props.chat.createdAt).format('h:mm a')}
      />
   )
}
export default Mess
