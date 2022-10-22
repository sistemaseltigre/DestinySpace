import React from "react";
import './Game.scss'
import GameSystem from './GameSystem/GameSystem'

class Game extends React.Component{
    constructor() {
        super();
        this.canvasShip = React.createRef(null)
        this.state = {
            inGame: true,
            canvasShipContext: null,
            canvasShip: null,
            screenWidth:480,
            screenHeight:853
        };
    }
    componentDidMount() {
        //crea en el estado el canvas de la nave
        this.setState({
            canvasShip:this.canvasShip,
            canvasShipContext:this.canvasShip.current.getContext("2d")
        })
    }
    render(){
        return(
            <>
                <GameCanvas gameData={this} key="4"/>,
                <GameSystem gameData={this} key="5"/>
            </>
            
        )
    }
}

export default Game


function GameCanvas(props) {
    if (props.gameData.state.inGame === true) {
        return (
        <div className="Game">
            <canvas className="canvasShip" key={3} ref={props.gameData.canvasShip} id="ship" width={props.gameData.state.screenWidth} height={props.gameData.state.screenHeight}/>
            {/* ejemplo: */}
            {/* <canvas ref={props.viewGame.CanvasMap1Tmp} className="CanvasMap1Tmp" id="CanvasMap1Tmp" width={1024} height={768}></canvas> */}
        </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}