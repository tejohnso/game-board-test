var canvas = document.createElement("canvas"),
ctx = canvas.getContext("2d"),
pixelsPerSquare;

const MIN_PX = 5;

function drawBoard(state) {
  var boardSideLength = state.length * pixelsPerSquare;

  ctx.fillStyle = "#DDDDDD";
  ctx.fillRect(0, 0, boardSideLength, boardSideLength);
  ctx.fillStyle = "#AAAAAA";
  
  state.forEach((row, rowIdx)=>{
    row.forEach((val, colIdx)=>{
      var xoffset = pixelsPerSquare * colIdx,
      yoffset = pixelsPerSquare * rowIdx;

      if (!val) {return;}

      ctx.fillRect(xoffset, yoffset, pixelsPerSquare, pixelsPerSquare);
    });
  });
}

module.exports = {
  setup(clickHandler, gamestate, size, px) {
    if (!Number.isInteger(px)) {px = 100;}
    if (px < MIN_PX) {px = 100;}
    if (!Number.isInteger(size)) {size = 3;}
    if (size < 2) {size = 3;}

    pixelsPerSquare = px;
    canvas.width = size * px;
    canvas.height = size * px;
    canvas.addEventListener("click", clickHandler.getHandler(gamestate, px));
    gamestate.observe(drawBoard);
    gamestate.initializeState(size);
    return canvas;
  }
};
