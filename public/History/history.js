fs = require("fs");

let recentImage = document.getElementById("recentImage")

fs.watch("./SavedImages", { persistent: true }, function (event, fileName) {
  recentImage.src="./SavedImages/"+fileName
});