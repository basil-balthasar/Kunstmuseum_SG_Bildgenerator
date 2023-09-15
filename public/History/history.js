let lastFileName

function setup(){
    createCanvas(windowWidth, windowHeight)
}

function draw(){
    lastFileName = localStorage.getItem("recentImageName")
    image("public/History/SavedImages"+lastFileName, 0, 0, width, height)
}