let lastFileName

function setup(){
    createCanvas(windowWidth, windowHeight)
}

function draw(){
    
    lastFileName = localStorage.getItem("recentImageName")
    img = loadImage("./SavedImages"+lastFileName)
    image(img, 0, 0, width, height)
}