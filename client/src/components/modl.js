import React,{ useState } from "react";
import { Modal, Input } from 'antd';

const Modl = props =>{
    const [room, setRoom] = useState("")
    const handleOk = e => {
        if(room.length>0){
            props.onSubmission(room)
        }
      };
      const handleCancel = e => {
        setRoom("")
        props.onSubmission()
      };
      const changed =(e) =>{
        setRoom(e.target.value)
      } 
    return(
        <Modal title="Create a Room" visible={true} onOk={handleOk} onCancel={handleCancel}>
        <Input value={room} onChange={changed} placeholder="Room Id"/>
      </Modal>
    )
}
export default Modl