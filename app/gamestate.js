const imageData = require("./imagedata.js");

var state,
observers = [];

function updateObservers() {
  observers.forEach((observer)=>{
    observer(state);
  });
}

module.exports = {
  activateSquare(coord) {
    if (!coord) {return;}

    state[coord[0]][coord[1]].hidden = !state[coord[0]][coord[1]].hidden;
    if (module.exports.checkFull()) {
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

    function shuffleArray(a) {
      var j, x, i;
      for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    }

    state = Array(boardSize).fill(" ").map((row)=>{
      var id = Math.random();
      return Array(boardSize).fill(" ").map((col)=>{
        return setState();
      });
    });

    state.forEach((col)=>{shuffleArray(col);});
    shuffleArray(state);

    updateObservers();
  },
  observe(cb) {
    observers.push(cb);
  },
  checkFull() {
    return state.every((row)=>{
      return row.every((col)=>{
        return (col.hidden === false);
      });
    });
  }
};
