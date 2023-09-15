let lastFileName
let img

function setup(){
    createCanvas(windowWidth, windowHeight)
    frameRate(1)
    background(0)
}

function draw(){
    lastFileName = localStorage.getItem("recentImageName")
    img = loadImage("./SavedImages/"+lastFileName, success())
}

function success(){
    image(img, 0, 0)
    print("juhuu")
}