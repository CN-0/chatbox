import React, {useState, useEffect} from 'react'
import { Modal, Input } from 'antd';
import { connect } from 'react-redux';
import '../css/home.css'
import Chat from './chat'
import Joinpage from './joinpage'

const Home = (props) =>{
    const [state, setState] = useState(false)
    const [room, setRoom] = useState("")
    const [roomid, setRoomId] = useState("")

    useEffect(()=>{
      const roomlc =  localStorage.getItem('room')
      if(roomlc){
        setState(false)
        setRoomId(roomlc)
      }else{
        setState(false)
      }
    },[])
    
    const showModal = () => setState(true)
    const handleOk = e => {
      setState(false)
      if(room.length>0){
        setRoomId(room)
        localStorage.setItem('room', room);
      }
    };
    const handleCancel = e => {
        setState(false);
        setRoom("")
    };
    const changed =(e) =>{
      setRoom(e.target.value)
    } 
    const local =() =>{
      setRoomId("")
      setRoom("")
     localStorage.removeItem('room');
    }
   return(
      <>
      <Modal title="Create a Room" visible={state} onOk={handleOk} onCancel={handleCancel}>
        <Input value={room} onChange={changed} placeholder="Room Id"/>
      </Modal>
      {roomid.length>0?<Chat room={roomid} username={props.username} leave={local} />:null} 
      {!roomid?<Joinpage clicked={showModal} close={local} />:null}
      </> 
    )
}

const mapStateToProps = state => {
  return {
    userToken: state.auth.token,
    username:state.auth.username
  };
};

export default connect(mapStateToProps)(Home)
