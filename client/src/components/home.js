import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import '../css/home.css'
import Chat from './chat'
import Joinpage from './joinpage'
import Modl from "./modl";

const Home = (props) =>{
  const [state, setState] = useState(false)
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
    
    const local =() =>{
      setRoomId("")
     localStorage.removeItem('room');
    }
    const submitted = data =>{
      setState(false);
      if(data.length>0){
        setRoomId(data)
        localStorage.setItem('room', data);
      }
    }
   return(
      <>
      {state?<Modl onSubmission={submitted} />:null }
      {roomid.length>0?<Chat room={roomid} username={props.username} leave={local} />:null} 
      {!roomid?<Joinpage clicked={showModal} />:null}
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
