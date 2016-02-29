const gamestate = require("./gamestate.js"),
clickHandler = require("./clickHandler.js"),
board = require("./board.js"),
defaultBoardSize = 5,
defaultSquareSize = 100,
minBoardSize = 3,
minSquareSize = 10;

var boardSize = document.currentScript.getAttribute("board-size"),
squareSize = document.currentScript.getAttribute("square-size");

boardSize = parseInt(boardSize);
(Number.isInteger(boardSize)) || (boardSize = defaultBoardSize);
(boardSize >= minBoardSize) || (boardSize = defaultBoardSize);

squareSize = parseInt(squareSize);
(Number.isInteger(squareSize)) || (squareSize = defaultSquareSize);
(squareSize >= minSquareSize) || (squareSize = defaultSquareSize);

document.body.appendChild
(board.setup(clickHandler, gamestate, boardSize, squareSize));
