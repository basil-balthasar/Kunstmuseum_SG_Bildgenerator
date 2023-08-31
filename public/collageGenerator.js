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
}

function windowResized() {
  cnv.position(windowWidth/2-cnvX/2, windowHeight/2-cnvY/2)
}