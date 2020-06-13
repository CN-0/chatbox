import React from "react";
import { Menu } from 'antd';
import { VideoCameraOutlined, CommentOutlined, ThunderboltOutlined,RollbackOutlined } from '@ant-design/icons';

const Menuu = props =>{
    return(<Menu
        theme="light"
        onClick={props.clicked}
        style={{ height:"91.1vh",width:"250px"}}
        defaultOpenKeys={['sub1']}
        selectedKeys={[props.current]}
        mode="inline"
      >
        <h3 style={{width:"200px",height:"10px",marginLeft:"30px",marginTop:"20px"}}>Room Id : {props.room}</h3>
        <Menu.Item key="1" icon={<VideoCameraOutlined />}>
          Vedio Call
        </Menu.Item>
        <Menu.Item key="2" icon={<CommentOutlined />}>
          Chat
        </Menu.Item>
        <Menu.Item key="3" icon={<ThunderboltOutlined />}>
          Games
        </Menu.Item>
        <Menu.Item key="4" onClick={props.leave} icon={<RollbackOutlined />}>
          Leave Room
        </Menu.Item>
      </Menu>)
}

export default Menuu