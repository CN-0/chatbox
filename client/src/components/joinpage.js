import React from 'react'
import '../css/chat.css'

const Joinpage = props =>{
    let div =(<div className="joinpage" style={{marginTop:"50px",backgroundColor:"lightblue"}}>
    <h1 style={{width:"100%"}}>Join a Room to Chat</h1>
     <button onClick={props.clicked} className="joinref"><h1 style={{paddingTop:"8px"}}>JOIN ROOM</h1></button>
    </div>)
    if(props.room){
        div =(<div className="joinpage" style={{marginTop:"10px",backgroundColor:"white"}}>
        <h1 style={{width:"100%"}}>Room Id : {props.room}</h1>
        <button onClick={props.close} className="joinref"><h1 style={{paddingTop:"8px"}}>LEAVE ROOM</h1></button>
        </div>)
    }
return(<>{div}</>)
}
export default Joinpage