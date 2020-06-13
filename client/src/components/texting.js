import React,{useState, useEffect,useRef} from "react"
import { EnterOutlined } from '@ant-design/icons'
import io from "socket.io-client";
import Mess from './mess'
import '../css/chat.css'

const Texting = props =>{
    const messagesEndRef = useRef(null)
    const [room] = useState(props.room)
    const [username] = useState(props.username)
    //const { current: socket } = useRef(io.connect("http://localhost:5000"))
    const { current: socket } = useRef(io())
    const [chats,setchats] = useState([])
    const [message,setmessage] = useState("")

    useEffect(()=>{
        if(room){
            socket.emit("roomData",{room:room,username:username})
        }
        socket.on('message',(data)=>{
            setchats(chats=>{
                return([...chats,data])
            })
        })
        return () => {
            socket.disconnect()
        }
        // eslint-disable-next-line
    },[])
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [chats])

    const submitted = (e) =>{
        e.preventDefault()
        socket.emit("incmessage",{
            room:room,
            message:message,
            username:username
        })
        setmessage("")
    }
    const changed = (e) =>{
        setmessage(e.target.value)
    }
    return(<div className="main-page">
    <div className="chat__main">
        <h1 style={{marginBottom:"2px"}}>Chat</h1>
        <div id="messages" className="chat__messages">
        {chats.map((chat,index)=><Mess key={index} chat={chat} />)}
        <div ref={messagesEndRef} />
        </div>
        <div className="compose">
            <form id="message-form" onSubmit={submitted}>
                <input id="inp" value={message} onChange={changed} placeholder="message...." required autoComplete="off" />
                <button type="" >< EnterOutlined /></button>
            </form> 
        </div>
    </div>
    </div>
)
}

export default Texting