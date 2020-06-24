import React,{useState,useEffect,useRef} from 'react'
import io from "socket.io-client";
import '../css/chat.css'

const Vedio = props =>{
    const [friend,setfriend] = useState("")
    const [room] = useState(props.room)
    const [username] = useState(props.username)
    const { current: socket } = useRef(io())
    useEffect(()=>{
        if(room){
            socket.emit("roomData",{room:room,username:username})

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
        return () => {
            socket.disconnect()
        }
     // eslint-disable-next-line
    },[])
    return(
    <div className="main-page">
    <div className="calleediv">
        <h1>{friend}</h1>
        <video id="callee" className="callee" autoPlay></video>
        <video id="caller" className="caller" autoPlay></video>
    </div>
    </div>
    )
}

export default Vedio