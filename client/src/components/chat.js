import React,{useState} from "react"
import { Menu, Button,Drawer } from 'antd';
import { VideoCameraOutlined, CommentOutlined, ThunderboltOutlined,RollbackOutlined } from '@ant-design/icons';
import Vedio from "./vedio";
import Texting from "./texting";
import '../css/chat.css'
const Chat = (props) =>{
    const [current, setCurrent] = useState("")
    const [state, setState] = useState({visible: false})
    const handleClick = e => {
      setCurrent(e.key)
    };
  
    
  const showDrawer = () => {
    setState({
      visible: true,
    });
  }
  const onClose = () => {
    setState({
      visible: false,
    });
  }
    return(
    <div style={{display:"flex",justifyContent:"left"}}>
        <Drawer
          title="Chatbox"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={state.visible}
        >
          <Menu
          theme="light"
          onClick={handleClick}
          style={{ height:"91.1vh",width:"250px"}}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
        >
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
        </Menu>
        </Drawer>
        <div className="menuu">
        <Menu
          theme="light"
          onClick={handleClick}
          style={{width:"250px",height:"91.1vh"}}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
        >
          <Menu.Item key="1" icon={<VideoCameraOutlined />}>
            Vedio Call
          </Menu.Item>
          <Menu.Item key="2" icon={< CommentOutlined />}>
            Chat
          </Menu.Item>
          <Menu.Item key="3" icon={<ThunderboltOutlined />}>
            Games
          </Menu.Item>
          <Menu.Item key="4" onClick={props.leave} icon={<RollbackOutlined />}>
            Leave Room
          </Menu.Item>
        </Menu>
        </div>
        <>
          {current==="1"?<Vedio room={props.room} username={props.username} />:null}
          {current==="2"?<Texting room={props.room} username={props.username} />:null}
        </>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        </div>
    )
}

export default Chat
