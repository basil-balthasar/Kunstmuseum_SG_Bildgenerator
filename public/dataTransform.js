let layerZOrder = [0, 1, 2, 3]

//background values
let backgroundColor = [200, 0, 255]

let myBackground
let foreground
let layerOne
let layerTwo
let layerThree

let joystickSpeed = 0.2

//get data from io sockets
function getData(data){
    const values = data.split(",")
    print(values[1])
}

function joystickToPosition(joystick, position){
    let joystickInput = [joystick[2]-joystick[0], joystick[3]-joystick[1]]
    position[0] = Math.min(Math.max(position[0]+=joystickInput[0]*joystickSpeed*deltaTime, 0), cnvX);
    position[1] = Math.min(Math.max(position[1]+=joystickInput[1]*joystickSpeed*deltaTime, 0), cnvY);
}

function checkForSave(){
    let newImageID = parseInt(localStorage.getItem("lastImageID"))
    if(newImageID != undefined){
        newImageID++
        localStorage.setItem("lastImageID", (newImageID).toString())
    }else localStorage.setItem("lastImageID", "0")
}