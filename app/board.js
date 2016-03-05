var canvas = document.createElement("canvas"),
ctx = canvas.getContext("2d");

function drawBoard(pixelsPerSquare, state) {
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
  setup(clickHandler, gamestate, gameOptions) {
    pixelsPerSquare = gameOptions.squareSize;
    boardSize = gameOptions.boardSize;

    canvas.width = boardSize * pixelsPerSquare;
    canvas.height = boardSize * pixelsPerSquare;
    canvas.addEventListener("click", clickHandler.getHandler(gamestate, pixelsPerSquare));
    gamestate.observe(drawBoard.bind(null, pixelsPerSquare));
    gamestate.initializeState(boardSize);
    return canvas;
  }
};
