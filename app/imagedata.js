const florash = require("florash");
var imageSize;

module.exports = {
  createImages(length, sizeOfImages) {
    (length) || (length = 2);
    (sizeOfImages) || (sizeOfImages = 1);
    opts = {size: sizeOfImages};
    imageSize = sizeOfImages;

    return Array(length).fill(" ").map(()=>{
      return new florash(String(Math.random()).concat(Math.random()), opts);
    })
    .map((instance)=>{
      return instance.toImageData();
    });
  },
  sizeOfImages() {return imageSize;}
};
