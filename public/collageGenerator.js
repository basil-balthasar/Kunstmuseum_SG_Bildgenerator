//canvas infos
let cnv
let cnvX = 400
let cnvY = 600

let blendModes

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
    blendModes = [BLEND]
    myBackground = new ImageObject(true, backgroundImages[0], [0,0], 1, 0)
    foreground = new ImageObject(false, foregroundImages[0], [0,0], 1, 0)
    layerOne = new ImageObject(true, layerOneImages[0], [300,300], 0.1, 45)
    layerTwo = new ImageObject(false, layerTwoImages[0], [0,0], 1, 0)
    layerThree = new ImageObject(false, layerThreeImages[0], [0,0], 1, 0)
}

function windowResized() {
  cnv.position(windowWidth/2-cnvX/2, windowHeight/2-cnvY/2)
}

function draw(){
  clear()

  joystickToPosition([1,0,0,1], layerOne.position)
  //background
  if(myBackground.isOn == true){
    image(myBackground.image, 0, 0, width, height, myBackground.position[0], myBackground.position[1], myBackground.image.width/myBackground.scale, myBackground.image.width/myBackground.scale*myBackground.ar, COVER, LEFT, TOP)
  }else{
    background(backgroundColor, 255)
  }

  //draw layers in order of Z depth
  for(let l = 0; l<4; l++){
    switch(layerZOrder[l]){
      case 0:
        if(foreground.isOn == true){
          drawFg()
        }
        break;
      case 1:
        if(layerOne.isOn == true){
          drawLayerOne()
        }
        break;
      case 2:
        if(layerTwo.isOn == true){
          drawLayerTwo()
        }
        break;
      case 3:
        if(layerThree.isOn == true){
          drawLayerThree()
        }
        break;      
    }
  }
}

function drawFg(){
}

function drawLayerOne(){
  push()
    translate(layerOne.position[0], layerOne.position[1])
    rotate(layerOne.rotation)
    image(layerOne.image, -layerOne.image.width*layerOne.scale/2, -layerOne.image.width*layerOne.scale*layerOne.ar/2, layerOne.image.width*layerOne.scale, layerOne.image.width*layerOne.scale*layerOne.ar)
    blendMode(BLEND)
  pop()  
}

function drawLayerTwo(){
  
}

function drawLayerThree(){

}

function mousePressed(){
  checkForSave()
}