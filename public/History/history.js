let lastFileName

function setup(){
    createCanvas(windowWidth, windowHeight)
    frameRate(1)
    background(0)
}

function draw(){
    lastFileName = localStorage.getItem("recentImageName")
    print(lastFileName)
    img = loadImage("./SavedImages/"+lastFileName)
    fill(255)
    rect(10,10,10,10)
    image(img, 0, 0, width, height)
}