import React,{useState} from "react"
import { Button,Drawer } from 'antd';
import Vedio from "./vedio";
import Texting from "./texting";
import Menuu from "./menuu";
import Games from "./games";
import '../css/chat.css'
const Chat = props =>{
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
        <Drawer title="Chatbox" placement="right" closable={false} onClose={onClose} visible={state.visible}>
          <Menuu current={current} leave={props.leave} room={props.room} clicked={handleClick} />
        </Drawer>
        <div className="menuu"><Menuu current={current} room={props.room} leave={props.leave} clicked={handleClick} /></div>
        <>
          {current==="1"?<Vedio room={props.room} username={props.username} />:null}
          {current==="2"?<Texting room={props.room} username={props.username} />:null}
          {current==="3"?<Games room={props.room} username={props.username} />:null}
        </>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        </div>
    )
}

export default Chat
