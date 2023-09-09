let layerZOrder = [0, 1, 2, 3]

//background values
let backgroundColor = [200, 0, 255]

let myBackground
let foreground
let layerOne
let layerTwo
let layerThree

let joystickSpeed = 0.2
let maxScale = 3
let minScale = 0.2

//get data from io sockets
function getData(data){
    const values = data.split(",")
    print(values[1])

    backgroundColor = [map(data[0], 0, 1023, 0, 255), map(data[0], 0, 1023, 0, 255), map(data[0], 0, 1023, 0, 255)]

    let layerValues = [data[0], data[0], data[0]]

    //layer z order
    for(let v = 0; v<3; v++){
        if(300 < layerValues[v] < 320){
        layerZOrder[v] = 0
        }
        if(500 < layerValues[v] < 600){
            layerZOrder[v] = 1
        }
        if(280 < layerValues[v] < 300){
            layerZOrder[v] = 2
        }
        if(300 < layerValues[v] < 320){
            layerZOrder[v] = 3
        }
    }
    
    //background data
    if(data[0] == 1){
        myBackground.isOn = true
        myBackground.image = backgroundImages[map(data[0], 0, 1023, 0, backgroundImages.length)]
        let backgroundJoystick = [data[0], data[0], data[0], data[0]]
        joystickToPosition(backgroundJoystick, myBackground.position)
        myBackground.scale = map(data[0], 0, 1023, minScale, maxScale)
    }else myBackground.isOn = false;

    //foreground data
    if(data[0] == 1){
        foreground.isOn = true
        foreground.image = foregroundImages[map(data[0], 0, 1023, 0, foregroundImages.length)]
        let foregroundJoystick = [data[0], data[1], data[2], data[3]]
        joystickToPosition(foregroundJoystick, foreground.position)
        foreground.scale = map(data[0], 0, 1023, minScale, maxScale)
    }else foreground.isOn = false

    //layerOne data
    if(data[0] == true){
        layerOne.isOn = true
        layerOne.image = layerOneImages[map(data[0], 0, 1023, 0, layerOneImages.length)]
        let layerOneJoystick = [data[0], data[0], data[0], data[0]]
        joystickToPosition(layerOneJoystick, layerOne.position)
        layerOne.scale = map(data[0], 0, 1023, minScale, maxScale)
        layerOne.rotation = map(data[0], 0, 1023, 0, 360)
        switch([data[0], data[0], data[0]]){
            case [1, 1, 1]:
                layerOne.blendMode = blendModes[0]
                break;
            case [0,1,1]:
                layerOne.blendMode = blendModes[1]
                break;
            case [1,0,1]:
                layerOne.blendMode = blendModes[2]
                break;
            case [1,1,0]:
                layerOne.blendMode = blendModes[3]
                break;
        }
    }else layerOne.isOn = false;
    
    //layerTwo data
    if(data[0] == true){
        layerTwo.isOn = true
        layerTwo.image = layerTwoImages[map(data[0], 0, 1023, 0, layerTwoImages.length)]
        let layerTwoJoystick = [data[0], data[0], data[0], data[0]]
        joystickToPosition(layerTwoJoystick, layerTwo.position)
        layerTwo.scale = map(data[0], 0, 1023, minScale, maxScale)
        layerTwo.rotation = map(data[0], 0, 1023, 0, 360)
        switch([data[0], data[0], data[0]]){
            case [1, 1, 1]:
                layerTwo.blendMode = blendModes[0]
                break;
            case [0,1,1]:
                layerTwo.blendMode = blendModes[1]
                break;
            case [1,0,1]:
                layerTwo.blendMode = blendModes[2]
                break;
            case [1,1,0]:
                layerTwo.blendMode = blendModes[3]
                break;
        }
    }else layerTwo.isOn = false;
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