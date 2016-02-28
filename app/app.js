var gamestate = require("./gamestate.js"),
clickHandler = require("./clickHandler.js"),
board = require("./board.js");

document.body.appendChild(board.setup(clickHandler, gamestate));
