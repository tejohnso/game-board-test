canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 300;
ctx = canvas.getContext("2d");

function drawBoard(state) {
  console.log(JSON.stringify(state));
  ctx.fillStyle = "#DDDDDD";
  ctx.fillRect(0, 0, 300, 300);
  ctx.fillStyle = "#AAAAAA";
  
  state.forEach((row, rowIdx)=>{
    row.forEach((val, colIdx)=>{
      if (!val) {return;}

      ctx.fillRect(100 * colIdx, 100 * rowIdx, 100, 100);
    });
  });
}

function reset() {
  ctx.clearRect(0, 0, 300, 300);
}

module.exports = {
  setup(clickHandler, gamestate) {
    canvas.addEventListener("click", clickHandler.getHandler(gamestate));
    gamestate.observe(drawBoard);
    gamestate.resetState();
    return canvas;
  }
};
