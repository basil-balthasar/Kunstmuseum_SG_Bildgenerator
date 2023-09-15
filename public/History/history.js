fs = require("fs");

let recentImage = document.getElementById("recentImage")

fs.watch("/Users/basil/Documents/Projekte_Arbeit/Kunstmuseum_St.Gallen/Vermittlungsraum/Kunstmuseum_SG_Bildgenerator/Kunstmuseum_SG_Bildgenerator/public/History/SavedImages", { persistent: true }, function (event, fileName) {

    let recentImageFileName = localStorage.getItem("recentImageName")
    if(recentImageFileName!=undefined){
        recentImage.src="./SavedImages/"+fileName
        console.log(fileName)
    }
});