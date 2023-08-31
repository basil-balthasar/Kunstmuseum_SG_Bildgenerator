//canvas infos
let cnv
let cnvX = 300
let cnvY = 400

function setup(){
    //setup io socket connection
    socket = io.connect("http://localhost:3000")
    socket.on("data", getData);

    //create canvas
    cnv = createCanvas(cnvX, cnvY)
    cnv.style('display', 'block')
    cnv.position(windowWidth/2-cnvX/2, windowHeight/2-cnvY/2)
    background(250, 0, 200)

    //general setups
    angleMode(DEGREES)
}

function windowResized() {
  cnv.position(windowWidth/2-cnvX/2, windowHeight/2-cnvY/2)
}

function draw(){
  clear()
  //background
  if(backgroundImageOn == true){
    //draw background image
  }else{
    background(backgroundColor, 255)
  }

  //draw layers in order of Z depth
  for(let l = 0; l<4; l++){
    switch(layerZOrder[l]){
      case 0:
        drawVg()
        break;
      case 1:
        drawLayerOne()
        break;
      case 2:
        drawLayerTwo()
        break;
      case 3:
        drawLayerThree()
        break;      
    }
  }
}

function drawVg(){

}

function drawLayerOne(){

}

function drawLayerTwo(){

}

function drawLayerThree(){

}