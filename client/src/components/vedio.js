import React from 'react'

const Vedio = props =>{
    return(
    <div style={{width:"560px",height:"100%",textAlign:"center"}}>
        <h1>{props.username}</h1>
        <video id={props.id} style={{width:"560px",height:"85%"}} autoPlay></video>
    </div>)
}

export default Vedio