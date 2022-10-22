import React,{Component} from "react";

// let moveLeftInterval = false;
// let moveRightInterval = false;

let intervalMoveLeftRunning = false
let intervalMoveRightRunning = false
let clearIntervalRight = false;
let clearIntervalLeft = false;

class GameSystem extends Component{
    constructor(props){
        super();
        this.state={
            // canvas dedicado al dibujado de la nave
            canvasShip:null,
            // context del canvas para dibujar la nave
            canvasShipContext:null,
            // size de la nave
            shipSize: 100,
            // posicion en el eje X a dibujar de la nave
            shipPosX:0,
            // posicion en el eje Y a dibujar de la nave
            shipPosY:0,
            // velocidad de movimiento de la nave
            shipVelocity:10,
        }
        // agrega las funciones al "this" 
        this.drawShip = this.drawShip.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.startGame = this.startGame.bind(this);
    }
    componentDidMount(){
        // setea en el estado ciertas variables provenientes de las props
        //canvas para dibujar la nave
        this.state.canvasShip = this.props.gameData.canvasShip
        // context del canvas para dibujar la nave
        this.state.canvasShipContext = this.props.gameData.canvasShip.current.getContext("2d")
        // asigna evento al documento para detectar cuando se presione una tecla
        document.onkeydown = this.keyDownHandler;
        // asigna evento al documento para detectar cuando se suelte una tecla
        document.onkeyup = this.keyUpHandler;
        // dibujar a la nave en la posicion inicial
        this.startGame();
    }
    // funcion para dibujar la nave y asignar la ubicacion de ella en el centro en la parte inferior del canvas
    startGame(){
        // cambia la posicion de la nave al centro en el eje X
        this.state.shipPosX = (this.props.gameData.state.screenWidth / 2) - (this.state.shipSize / 2)
        // cambia la posicion de la nave a la parte inferior del canvas en el eje Y
        this.state.shipPosY = this.props.gameData.state.screenHeight - 100

        // declara el context del canvas localmente
        let canvasShipContext = this.props.gameData.canvasShip.current.getContext("2d")
        // limpia el canvas antes de iniciar el dibujado
        canvasShipContext.clearRect(this.state.shipPosX,this.state.shipPosY,this.state.shipSize,this.state.shipSize)
        //dibuja la nave en el canvas
        canvasShipContext.fillRect(this.state.shipPosX,this.state.shipPosY,this.state.shipSize,this.state.shipSize)
    }
    drawShip(){
        console.log("exe")
    }
    // detecta cuando una tecla ha sido presionada
    keyDownHandler(e){
        // moverse abajo(tecla D)
        if(e.keyCode ===68){
            if(intervalMoveRightRunning === false){
                // entra solo una vez evitar la creacion de otro intervalo
                intervalMoveRightRunning = true

                // solo permite la ejecucion de este intervalo
                clearIntervalRight = false
                clearIntervalLeft = true
                let moveRightInterval = setInterval(() => {
                    if(clearIntervalRight === false){
                        // verifica la posicion para que la nave no salga del canvas
                        if(this.state.shipPosX + this.state.shipSize < this.props.gameData.state.screenWidth){
                            // borra la ship anterior 
                            this.state.canvasShipContext.clearRect(this.state.shipPosX,this.state.shipPosY,this.state.shipSize,this.state.shipSize)
                            // permite moverse a la izquierda
                            this.state.shipPosX = this.state.shipPosX + this.state.shipVelocity;
                            // dibuja la nave en la nueva ubicacion
                            this.state.canvasShipContext.fillRect(this.state.shipPosX,this.state.shipPosY,this.state.shipSize,this.state.shipSize)
                        }
                    }else{
                        // limpia el interval 
                        clearInterval(moveRightInterval)
                        clearIntervalRight = false
                    }
                }, 35);                
            }
        }
        // moverse abajo(tecla A)
        if(e.keyCode ===65){

            if(intervalMoveLeftRunning === false){
                // entra solo una vez evitar la creacion de otro intervalo
                intervalMoveLeftRunning = true

                // solo permite la ejecucion de este intervalo
                clearIntervalLeft = false
                clearIntervalRight = true
            
                let moveLeftInterval = setInterval(() => {
                    if(clearIntervalLeft === false){
                    // verifica la posicion para que la nave no salga del canvas
                        if(this.state.shipPosX > 0){
                            // borra la ship anterior 
                            this.state.canvasShipContext.clearRect(this.state.shipPosX,this.state.shipPosY,this.state.shipSize,this.state.shipSize)
                            // permite moverse a la derecha
                            this.state.shipPosX = this.state.shipPosX - this.state.shipVelocity;
                            // dibuja la nave en la nueva ubicacion
                            this.state.canvasShipContext.fillRect(this.state.shipPosX,this.state.shipPosY,this.state.shipSize,this.state.shipSize)
                        }
                    }else{
                        // limpia el interval 
                        clearInterval(moveLeftInterval)
                        clearIntervalLeft = false
                    }
                }, 35);
            }
        }
        // futura tecla esc, tecla de ataque y tecla de habilidad especial
        // if(e.keyCode ===68){
        //     console.log('presionaste la tecla....')
        // }
    }
    // detecta cuando una tecla ha sido soltada
    keyUpHandler(e){
        // soltar la tecla(tecla D)
        if(e.keyCode ===68){
            // al soltar la tecla permite la creacion de otro intervalo y detiene el movimiento
            clearIntervalRight = true
            intervalMoveRightRunning = false
        }
        // soltar la tecla(tecla A)
        if(e.keyCode ===65){
            // al soltar la tecla permite la creacion de otro intervalo y detiene el movimiento
            clearIntervalLeft = true
            intervalMoveLeftRunning = false
        }
    }
    render(){
        // no retorna nada porque no es necesario en este archivo
        return(
            <></>
        )
    }
}

export default GameSystem