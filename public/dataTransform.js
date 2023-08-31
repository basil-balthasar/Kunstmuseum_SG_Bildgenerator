let layerZOrder = [0, 1, 2, 3]

//background values
let backgroundColor = [200, 0, 255]

let myBackground
let foreground
let layerOne
let layerTwo
let layerThree

//get data from io sockets
function getData(data){
    const dataPacks = data.split("|")
    let moduleValues = []
    for(let m = 0; m<modules.length; m++){
        moduleValues[m] = dataPacks.split(",")
    }
    print(moduleValues[0][1])
}