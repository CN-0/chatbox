import React from 'react'
import '../css/chat.css'

const Vedio = props =>{
    const clas = "vedio-div "+props.id+"div"
    const vedi = "vedii "+props.id
    return(
    <div className={clas}>
        <h1>{props.username}</h1>
        <video id={props.id} className={vedi} autoPlay></video>
    </div>)
}

export default Vedio