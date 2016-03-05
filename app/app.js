const gamestate = require("./gamestate.js"),
clickHandler = require("./clickHandler.js"),
board = require("./board.js");

var boardSize = document.currentScript.getAttribute("board-size"),
squareSize = document.currentScript.getAttribute("square-size");

document.body.appendChild
(board.setup(clickHandler, gamestate, {board: boardSize, square: squareSize}));
