import React,{useState} from "react";
import { EnterOutlined } from '@ant-design/icons';

const Inp = (props) =>{
    const [message,setmessage] = useState("")
    const submitted = (e) =>{
        e.preventDefault()
        props.onSubmission(message)
        setmessage("")
    }
    const changed = (e) =>{
        setmessage(e.target.value)
    }
    return(<form id="message-form" onSubmit={submitted}>
    <input id="inp" value={message} onChange={changed} placeholder="message...." required autoComplete="off" />
    <button type="" >< EnterOutlined /></button>
</form> )
}

export default Inp