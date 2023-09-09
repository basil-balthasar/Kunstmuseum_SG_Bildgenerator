let layerZOrder = [0, 1, 2, 3, 4, 5]

//background values
let backgroundColor = [200, 0, 255]

let myBackground
let foreground
let layerOne
let layerTwo
let layerThree

let joystickSpeed = 4
let maxScale = 3
let minScale = 1

//get data from io sockets
function getData(data){
    const values = data.split(",")

    backgroundColor = [255,255,255]
    //backgroundColor = [map(values[0], 0, 1023, 0, 255), map(values[0], 0, 1023, 0, 255), map(values[0], 0, 1023, 0, 255)]

    let layerValues = [values[38], values[40], values[39]]

    
    //layer z order
    layerZOrder = [0,1,2,3,4,5]
    for(let v = 0; v<3; v++){
        if(490 < layerValues[v] < 510){
            layerZOrder[v]+=1
            layerZOrder[v+3] = 0
        }
        else if(320 < layerValues[v] < 350){
            layerZOrder[v]+=1
            layerZOrder[v+3] = 1
        }
        else if(650 < layerValues[v] < 690){
            layerZOrder[v]+=1
            layerZOrder[v+3] = 2
        }
        else if(380 < layerValues[v] < 420){
            layerZOrder[v]+=1
            layerZOrder[v+3] = 3
        }
    }
    
    
    
    //background values
    if(values[10] == 1){
        myBackground.isOn = true
        myBackground.image = backgroundImages[round(map(values[38], 0, 1023, 0, backgroundImages.length-1))]
        myBackground.scale = map(values[37], 0, 1023, 1, 2)
        let backgroundJoystick = [values[11], values[14], values[13], values[12]]
        let backgroundMovement = [parseInt(backgroundJoystick[3])-parseInt(backgroundJoystick[1]), parseInt(backgroundJoystick[0])-parseInt(backgroundJoystick[2])]
        myBackground.position[0]-=backgroundMovement[0]*2*deltaTime
        myBackground.position[1]-=backgroundMovement[1]*2*deltaTime

        myBackground.position[0] = constrain(myBackground.position[0], 0, myBackground.image.width-myBackground.image.height/myBackground.scale/16*9)
        myBackground.position[1] = constrain(myBackground.position[1], 0, myBackground.image.height-myBackground.image.height/myBackground.scale)
    }else myBackground.isOn = false;

    //foreground values
    if(values[21] == 1){
        foreground.isOn = true
        foreground.image = foregroundImages[round(map(values[35], 0, 1023, 0, foregroundImages.length-1))]
        foreground.scale = map(values[36], 0, 1023, 1, 1.3)
        let foregroundJoystick = [values[23], values[22], values[24], values[20]]
        let foregroundMovement = [parseInt(foregroundJoystick[3])-parseInt(foregroundJoystick[1]), parseInt(foregroundJoystick[0])-parseInt(foregroundJoystick[2])]
        foreground.position[0]-=foregroundMovement[0]*2*deltaTime
        foreground.position[1]-=foregroundMovement[1]*2*deltaTime

        foreground.position[0] = constrain(foreground.position[0], 0, foreground.image.width-foreground.image.height/foreground.scale/16*9)
        foreground.position[1] = constrain(foreground.position[1], 0, foreground.image.height-foreground.image.height/foreground.scale)
    }else foreground.isOn = false

    //layerOne values
    if(values[9] == 1){
        layerOne.isOn = true
        layerOne.image = layerOneImages[round(map(values[31], 0, 1023, 0, layerOneImages.length-1))]
        let layerOneJoystick = [values[5], values[8], values[7], values[6]]
        joystickToPosition(layerOneJoystick, layerOne.position)
        layerOne.scale = map(values[30], 0, 1023, 0.1, 0.5)
        layerOne.rotation = map(values[29], 0, 1023, 0, 360)

        if (values[15] == 1 && values[16] == 1 && values[17] == 1) {
            layerOne.blendMode = blendModes[0]
        }else if(values[15] == 0 && values[16] == 1 && values[17] == 1){
            layerOne.blendMode = blendModes[1]
        }else if(values[15] == 1 && values[16] == 0 && values[17] == 1){
            layerOne.blendMode = blendModes[2]
        }else if(values[15] == 1 && values[16] == 1 && values[17] == 0){
            layerOne.blendMode = blendModes[3]
        }
    }else layerOne.isOn = false;
    
    //layerTwo values
    if(values[3] == true){
        layerTwo.isOn = true
        layerTwo.image = layerTwoImages[round(map(values[33], 0, 1023, 0, layerTwoImages.length-1))]
        let layerTwoJoystick = [values[4], values[2], values[0], values[1]]
        joystickToPosition(layerTwoJoystick, layerTwo.position)
        layerTwo.scale = map(values[34], 0, 1023, 0.1, 0.5)
        layerTwo.rotation = map(values[32], 0, 1023, 0, 360)
        if (values[28] == 1 && values[26] == 1 && values[25] == 1) {
            layerTwo.blendMode = blendModes[0]
        }else if(values[28] == 0 && values[26] == 1 && values[25] == 1){
            layerTwo.blendMode = blendModes[1]
        }else if(values[28] == 1 && values[26] == 0 && values[25] == 1){
            layerTwo.blendMode = blendModes[2]
        }else if(values[28] == 1 && values[26] == 1 && values[25] == 0){
            layerTwo.blendMode = blendModes[3]
        }
    }else layerTwo.isOn = false;

    //button => 19
}

function joystickToPosition(joystick, position){
    let joystickInput = [parseInt(joystick[3])-parseInt(joystick[1]), parseInt(joystick[0])-parseInt(joystick[2])]
    position[0] = Math.min(Math.max(position[0]+=joystickInput[0]*joystickSpeed*deltaTime, 0), cnvX);
    position[1] = Math.min(Math.max(position[1]+=joystickInput[1]*joystickSpeed*deltaTime, 0), cnvY);
}