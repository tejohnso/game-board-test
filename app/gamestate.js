const imageData = require("./imagedata.js");

var state,
wins = 0,
lastSelection = {id: 0, coords: [0, 0]},
observers = [];

function updateObservers() {
  observers.forEach((observer)=>{
    observer(state);
  });
}

module.exports = {
  activateSquare(coord) {
    if (!coord) {return state;}
    var square = state[coord[0]][coord[1]];

    if (square.matched) {return state;}
    
    square.hidden = false;

    function sameCoordsAsPrevious() {
      if (!lastSelection.id) {return true;}

      return lastSelection.coords[0] === coord[0] &&
      lastSelection.coords[1] === coord[1];
    }

    if (!sameCoordsAsPrevious()) {
      if (square.id === lastSelection.id) {
        square.matched = true;
        state[lastSelection.coords[0]][lastSelection.coords[1]].matched = true;
      } else {
        state[lastSelection.coords[0]][lastSelection.coords[1]].hidden = true;
      }
    }

    lastSelection.id = square.id;
    lastSelection.coords = coord;

    if (module.exports.checkFull()) {
      wins += 1;
      module.exports.initializeState(state.length, imageData.sizeOfImages());
    } else {
      updateObservers();
    }

    return state;
  },
  initializeState(boardSize, squareSize) {
    var squares = boardSize * boardSize, 
    images = imageData.createImages(Math.ceil(squares / 2), squareSize),
    squareState = {hidden: true, id: 0, data: 0},
    squareStateRepeater = [
      function newSquareState() {
        squareState = {hidden: true, id: Math.random(), data: images.pop()};
        return Object.assign({}, squareState);
      },
      function repeatSquareState() {
        return Object.assign({}, squareState);
      }
    ];

    function setState() {
      var fn = squareStateRepeater.shift();
      squareStateRepeater.push(fn);
      return fn();
    }

    function shuffleState(state) {
      var randCol, randRow, temp, row, col;
      for (row = state.length; row; row -= 1) {
        for (col = state.length; col; col -= 1) {
          randRow = Math.floor(Math.random() * row);
          randCol = Math.floor(Math.random() * col);
          temp = state[row - 1][col - 1];
          state[row - 1][col - 1] = state[randRow][randCol];
          state[randRow][randCol] = temp;
        }
      }
    }

    state = Array(boardSize).fill(" ").map((row)=>{
      var id = Math.random();
      return Array(boardSize).fill(" ").map((col)=>{
        return setState();
      });
    });

    shuffleState(state);

    if (squares % 2 !== 0) {
      state[0][0].matched = true;
      state[0][0].hidden = false;
    }

    updateObservers();
    return state;
  },
  observe(cb) {
    observers.push(cb);
  },
  checkFull() {
    return state.every((row)=>{
      return row.every((col)=>{
        return (col.matched === true);
      });
    });
  },
  wins() {return wins;},
  state() {return state;}
};
