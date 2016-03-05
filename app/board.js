var canvas = document.createElement("canvas"),
ctx = canvas.getContext("2d");

const minimums = {
  board: 3,
  square: 5
};

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

function validateOptions(options) {
  Object.keys(options).forEach((key)=>{
    options[key] = parseInt(options[key]);
    (Number.isInteger(options[key])) || (options[key] = minimums[key]);
    (options[key] >= minimums[key]) || (options[key] = minimums[key]);
  });
  return options;
}

module.exports = {
  setup(clickHandler, gamestate, sizeOptions) {
    sizeOptions = validateOptions(sizeOptions);
    pixelsPerSquare = sizeOptions.square;
    boardSize = sizeOptions.board;

    canvas.width = boardSize * pixelsPerSquare;
    canvas.height = boardSize * pixelsPerSquare;
    canvas.addEventListener("click", clickHandler.getHandler(gamestate, pixelsPerSquare));
    gamestate.observe(drawBoard.bind(null, pixelsPerSquare));
    gamestate.initializeState(boardSize);
    return canvas;
  }
};
