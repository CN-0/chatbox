import React, { useState, useEffect,useRef } from "react"
import { EnterOutlined } from '@ant-design/icons'
import io from "socket.io-client";
import Vedio from "./vedio";
import Mess from './mess'
import '../css/chat.css'

const Chat = (props) =>{
    const messagesEndRef = useRef(null)
    const [chats,setchats] = useState([])
    const [chat,setchat] = useState([])
    const [message,setmessage] = useState("")
    const [friend,setfriend] = useState("")
    const room = props.room
    const username = props.username
    //var socket = io.connect("http://localhost:5000");
    const socket = io()

    useEffect(()=>{
        if(room){
            socket.emit("roomData",{room:room,username:username})
        }
        socket.on('message',(data)=>{
            setchat([...chat,data])
        })
        return () => {
            socket.disconnect()
            socket.close()
        }
        // eslint-disable-next-line
    },[])
    useEffect(()=>{
        setchats(chats.concat(chat))
        // eslint-disable-next-line
    },[chat])
    

    useEffect(()=>{
        if(room){
            
            var peerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
            var sessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

            var pc = new peerConnection({ iceServers: [{
                url: "stun:stun.services.mozilla.com",
                username: "somename",
                credential: "somecredentials" 
            }]
            });
            
            const error = (err) => {
                console.warn('Error', err); 
            }

            pc.onaddstream = function (obj) {
                var callee = document.getElementById('callee')
                callee.srcObject = obj.stream;
            }
            navigator.getUserMedia({audio:true,video: true}, function (stream) {
                var caller = document.getElementById('caller');
                caller.srcObject = stream;
                pc.addStream(stream);
            }, error);
            
            socket.on('createOffer',()=>{
                pc.createOffer(function(offer) {
                    pc.setLocalDescription(new sessionDescription(offer), function (){
                        socket.emit('make-offer', {
                            offer: offer,
                            room: room,
                            username:username
                        });
                    }, error);
                }, error);
            
            })
                 
            
            socket.on('offer-made', function (data) {
                    setfriend(data.username)
                    pc.setRemoteDescription(new sessionDescription(data.offer),
                    function () {

                        pc.createAnswer(function (answer) {
                            pc.setLocalDescription(new sessionDescription(answer), function (){
                                socket.emit('make-answer', {
                                    answer: answer,
                                    room: room 
                                });
                            }, error);
                        }, error);
                    }, error);
            });
            socket.on('answer-made', function (data) {
                pc.setRemoteDescription(new sessionDescription(data.answer),function(){
                    socket.emit('final',room,)
            },error);
            });           

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

    return(
    <div className="main-page">
       <Vedio id="caller" username={username} />
       <div className="main-chat">
        <div className="chat__main">
        <h1>chat</h1>
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
       <Vedio id="callee" username={!friend?"waiting for your friend":friend} />    
        
    </div>
    )
}

export default Chat
