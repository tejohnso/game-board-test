const assert = require("assert"),
imageData = require("../app/imagedata.js");

describe("Image Data", ()=>{
  it("creates an array of random image data", ()=>{
    var images = imageData.createImages(5);
    assert.equal(images.length, 5);
    assert.equal(images[0].toString(), `[object ImageData]`);
  });

  it("returns current image size", ()=>{
    var images = imageData.createImages(5,50);
    assert.equal(imageData.sizeOfImages(), 50);
  });
});
