import React, {Component} from 'react'
import io from 'socket.io-client'
const socket = io()

class Games extends Component{
    state={
        disableth:true,
        buttonText:{a0:"", a1:"", a2:"", b0:"", b1:"", b2:"", c0:"", c1:"", c2:""},
        classname:{a0:"def", a1:"def", a2:"def", b0:"def", b1:"def", b2:"def", c0:"def", c1:"def", c2:"def"},
        symbol:"",
        opponentUsername:"",
        message:"Waiting for opponent to join...",
        myTurn:false,
        gameOver:false
    }
    componentDidMount(){
        socket.emit("gameData",{username:this.props.username,restart:false})
        socket.on("game-begin",(data)=>{
            this.gameBegin(data)
            this.renderTurnMessage()
        })
        socket.on('move-made', (data)=> {
            this.moveMade(data)
        });
    }
    componentWillUnmount(){
        socket.disconnect()
    }
    renderTurnMessage () {
        !this.state.myTurn?this.setState({message:"your opponent turn",disableth:true}):this.setState({message:"your turn",disableth:false})
    }
    gameBegin = data =>{
        this.setState({symbol:data.symbol,opponentUsername:data.opponentUsername,myTurn:data.symbol === 'X'})
    }
    moveMade = data =>{
        this.setState(prevState=>{
            let btn = prevState.buttonText
            btn[data.position] = data.symbol
            return ({buttonText:{...btn}})
        })
        this.setState(prevState=>{
            let cls = prevState.classname
            cls[data.position] = data.symbol===this.state.symbol?"me":"opp"
            return ({classname:{...cls}})
        })
        this.setState({myTurn:data.symbol !==this.state.symbol})
        if (!this.isGameOver()) {
            this.draw()?this.setState({message:"Game draw",disableth:true,gameOver:true}):this.renderTurnMessage()
        } else {
          if (this.state.myTurn) {
            this.setState({message:"Game over you lost"})
          }else {
            this.setState({message:"Game over you won"})  
          }
          this.setState({disableth:true,gameOver:true})
        }
    }
    isGameOver = ()=> {
        var state = this.state.buttonText
        let matches = ['XXX', 'OOO']
        let rows = [
        state.a0 + state.a1 + state.a2,
        state.b0 + state.b1 + state.b2,
        state.c0 + state.c1 + state.c2,
        state.a0 + state.b1 + state.c2,
        state.a2 + state.b1 + state.c0,
        state.a0 + state.b0 + state.c0,
        state.a1 + state.b1 + state.c1,
        state.a2 + state.b2 + state.c2
        ]
        for (var i = 0; i<rows.length; i++) {
        if (rows[i] === matches[0] || rows[i] ===matches[1]) {
            return true;
        }
        }
    }
    draw = () =>{
        let state = this.state.buttonText
        let keys = Object.keys(state)
        for (var i = 0; i<keys.length; i++) {
            if (state[keys[i]].length===0) {
                return false;
            }
        }
        return true
    }
    handleClick = e =>{
        e.preventDefault()
        if (!this.state.myTurn || this.state.buttonText[e.target.id] === undefined || this.state.buttonText[e.target.id].length>0) {
        return;
        }
        socket.emit('make-move', {
        symbol: this.state.symbol,
        position: e.target.id
        });
        this.setState( { disableth : true });
    }
    restart =()=>{
        this.setState({
            disableth:true,
            buttonText:{a0:"", a1:"", a2:"", b0:"", b1:"", b2:"", c0:"", c1:"", c2:""},
            classname:{a0:"def", a1:"def", a2:"def", b0:"def", b1:"def", b2:"def", c0:"def", c1:"def", c2:"def"},
            symbol:"",
            opponentUsername:"",
            message:"Waiting for opponent to join...",
            myTurn:false,
            gameOver:false
        })
        socket.emit('gameData',{username:this.props.username,restart:true})
    }
    render(){
        return(<div className="main-page">
        <div className="game__main">
            <div onClick={this.handleClick} className="board">
                {Object.keys(this.state.buttonText).map(key=><button disabled={this.state.disableth} className={this.state.classname[key]} id={key} key={key}>{this.state.buttonText[key]}</button>)}
                    <h3>{this.state.message}</h3>
            </div>
            {this.state.opponentUsername?<h2>{this.props.username}<span>  VS  </span>{this.state.opponentUsername}</h2>:null}
            {this.state.gameOver?<button className="play-again" onClick={this.restart} >new game</button>:null}
        </div>
        </div>)
    }
}

export default Games