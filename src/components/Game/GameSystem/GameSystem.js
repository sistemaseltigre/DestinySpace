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
            ////////////////////////////////// ?
                // * variables de nave
            ////////////////////////////////// ?
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
            shipVelocity:3,
            ////////////////////////////////// ?
            // * variables de disparo/Fuego
            ////////////////////////////////// ?
            // velocidad de disparo
            fireVelocity: 5,
            // cadencia de disparo
            fireDelay:600,
            // permite disparar
            canFire:true,
            // size de los disparos
            shootSize:{width:30,height:60},
            // array de coordenadas de disparos
            shoots:[],
            ////////////////////////////////// ?
                // * variables de enemigos
            ////////////////////////////////// ?
            enemies:[],
            enemyToLoad:{
                hp:10,
                defense: 3,
                name:"stellar",
                level:1,
                damage:5,
                movementeVelocity:2,
                posX:null,
                posY:null,
                size:{width:30,height:30}
            },
            enemiesRows:{
            },
            enemiesPattern:"4/3/4/3"
        }
        // agrega las funciones al "this" 
        this.drawShip = this.drawShip.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.startGame = this.startGame.bind(this);
        this.loadEnemies = this.loadEnemies.bind(this);
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
    loadEnemies(){

    }
    drawShip(){
    }
    // detecta cuando una tecla ha sido presionada
    keyDownHandler(e){
        // moverse abajo(tecla D o flecha derecha)
        if(e.keyCode ===68 || e.keyCode === 39){
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
        // moverse abajo(tecla A o flecha izquierda)
        if(e.keyCode ===65 || e.keyCode === 37){

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
        // tecla para disparar(tecla espaciadora)
        if(e.keyCode === 32){
            if(this.state.canFire === true){
                // bloquea el disparo
                this.state.canFire = false
                // declara las coordenadas del proyectil con respecto a mi eje X y Y
                let projectile = {x:this.state.shipPosX + this.state.shipSize / 2 - this.state.shootSize.width / 2,y: this.state.shipPosY - this.state.shipSize,index:this.state.shoots.length,active:true}
                // pushea al array de shoots las coordenadas de los nuevos proyectiles
                this.state.shoots.push(projectile)
                // cambia el color y dibuja el proyectil
                this.state.canvasShipContext.fillStyle = "#48e";
                this.state.canvasShipContext.fillRect(projectile.x,projectile.y,this.state.shootSize.width,this.state.shootSize.height)
                let drawShoot = setInterval(() => {
                    // borra el proyectil
                    this.state.canvasShipContext.clearRect(projectile.x,projectile.y,this.state.shootSize.width,this.state.shootSize.height)
                    // cambia la ubicacion del proyectil
                    projectile.y = projectile.y - this.state.fireVelocity; 
                    // busca el proyectil correspondiente, actualiza sus coordenadas y mantiene su estado activo para colisionar
                    for (let i = 0; i < this.state.shoots.length; i++) {
                        let shoot = this.state.shoots[i]
                        if(shoot.index === projectile.index){
                            shoot.y = projectile.y
                            shoot.active = true
                        }
                    }
                    // dibuja el proyectil
                    this.state.canvasShipContext.fillRect(projectile.x,projectile.y,this.state.shootSize.width,this.state.shootSize.height)
                    // en caso de que el proyectil salga del canvas lo borra y detiene el bucle
                    if(projectile.y - this.state.fireVelocity < 0){
                        // busca el proyectil y por el index y lo deshabilita
                        for (let i = 0; i < this.state.shoots.length; i++) {
                            let shoot = this.state.shoots[i]
                            if(shoot.index === projectile.index){
                                shoot.active = false
                            }
                        }
                        // borra el proyectil
                        this.state.canvasShipContext.clearRect(projectile.x,projectile.y,this.state.shootSize.width,this.state.shootSize.height)
                        // limpia el intervalo del disparo
                        clearInterval(drawShoot);
                    }
                }, 35);
                // habilita el disparo segun la cadecia de tiro
                setTimeout(() => {
                    this.state.canFire = true
                }, this.state.fireDelay);
            }
        }
    }
    // detecta cuando una tecla ha sido soltada
    keyUpHandler(e){
        // soltar la tecla(tecla D o flecha derecha)
        if(e.keyCode ===68 || e.keyCode === 39){
            // al soltar la tecla permite la creacion de otro intervalo y detiene el movimiento
            clearIntervalRight = true
            intervalMoveRightRunning = false
        }
        // soltar la tecla(tecla A o flecha izquierda)
        if(e.keyCode ===65 || e.keyCode === 37){
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