let lastFileName

function setup(){
    createCanvas(windowWidth, windowHeight)
    frameRate(1)
}

function draw(){
    lastFileName = localStorage.getItem("recentImageName")
    print(lastFileName)
    img = loadImage("./SavedImages/"+lastFileName)
    image(img, 0, 0, width, height)
}