canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

function drawBoard(state) {
  ctx.fillStyle = "#DDDDDD";
  ctx.fillRect(0, 0, state.length * 100, state.length * 100);
  ctx.fillStyle = "#AAAAAA";
  
  state.forEach((row, rowIdx)=>{
    row.forEach((val, colIdx)=>{
      if (!val) {return;}

      ctx.fillRect(100 * colIdx, 100 * rowIdx, 100, 100);
    });
  });
}

module.exports = {
  setup(clickHandler, gamestate, size) {
    if (!Number.isInteger(size)) {size = 3;}
    if (size < 2) {size = 3;}

    canvas.width = size * 100;
    canvas.height = size * 100;
    canvas.addEventListener("click", clickHandler.getHandler(gamestate));
    gamestate.observe(drawBoard);
    gamestate.initializeState(size);
    return canvas;
  }
};
