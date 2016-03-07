var canvas = document.createElement("canvas"),
ctx = canvas.getContext("2d"),
imageData = require("./imagedata.js"),
tileMap = {};

function drawBoard(pixelsPerSquare, state) {
  var boardSideLength = state.length * pixelsPerSquare;
  ctx.fillStyle = "#AAAAAA";

  state.forEach((row, rowIdx)=>{
    row.forEach((val, colIdx)=>{
      var xoffset = pixelsPerSquare * colIdx,
      yoffset = pixelsPerSquare * rowIdx;

      if (val.hidden) {
        return drawHidden(xoffset, yoffset);
      }

      drawTile(xoffset, yoffset, val.id);
    });
  });

  function drawHidden(xoffset, yoffset) {
    ctx.fillRect(xoffset, yoffset, pixelsPerSquare, pixelsPerSquare);
  }

  function drawTile(xoffset, yoffset, id) {
    ctx.putImageData(tileMap[id], xoffset, yoffset);
  }
}

module.exports = {
  setup(clickHandler, gamestate, gameOptions) {
    var pixelsPerSquare = gameOptions.squareSize,
    boardSize = gameOptions.boardSize,
    images = imageData.createImages(Math.ceil(boardSize * boardSize / 2), pixelsPerSquare);

    canvas.width = boardSize * pixelsPerSquare;
    canvas.height = boardSize * pixelsPerSquare;
    canvas.addEventListener("click", clickHandler.getHandler(gamestate, pixelsPerSquare));
    gamestate.initializeState(boardSize);
    gamestate.observe(drawBoard.bind(null, pixelsPerSquare));

    gamestate.state().forEach((row)=>{
      row.forEach((col)=>{
        (tileMap[col.id]) || (tileMap[col.id] = images.pop());
      });
    });

    drawBoard(pixelsPerSquare, gamestate.state());
    return canvas;
  }
};
