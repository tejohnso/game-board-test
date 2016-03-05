const gamestate = require("./gamestate.js"),
clickHandler = require("./clickhandler.js"),
board = require("./board.js"),
gameOptions = require("./gameoptions.js")
.minimums({
  boardSize: 3,
  squareSize: 5
})
.validate({
  boardSize: document.currentScript.getAttribute("board-size"),
  squareSize: document.currentScript.getAttribute("square-size")
});

document.body.appendChild
(board.setup(clickHandler, gamestate, gameOptions));
