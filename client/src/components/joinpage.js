import React from 'react'
import '../css/chat.css'

const Joinpage = props =>{
    
return(<div className="joinpage">
<h1 style={{width:"100%"}}>Join a Room to Chat</h1>
 <button onClick={props.clicked} className="joinref"><h1 style={{paddingTop:"8px"}}>JOIN ROOM</h1></button>
</div>)
}
export default Joinpage
