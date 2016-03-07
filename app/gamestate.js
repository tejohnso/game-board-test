var wins = 0,
lastSelection = {id: 0, coords: [0, 0]},
observers = [],
state;

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
        state[lastSelection.coords[0]][lastSelection.coords[1]].hidden = false;
      } else if (!state[lastSelection.coords[0]][lastSelection.coords[1]].matched) {
        state[lastSelection.coords[0]][lastSelection.coords[1]].hidden = true;
      }
    }

    lastSelection.id = square.id;
    lastSelection.coords = coord;

    if (module.exports.checkFull()) {
      wins += 1;
    }

    updateObservers();
    return state;
  },
  initializeState(boardSize) {
    var id = 0; 

    function getId() {
      if (id) {
        ret = id;
        id = 0;
        return ret;
      } else {
        id = String(Math.random()).concat(Math.random());
        return id;
      }
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
      return Array(boardSize).fill(" ").map((col)=>{
        return {hidden: true, id: getId()};
      });
    });

    if (boardSize % 2 !== 0) {
      state[boardSize - 1][boardSize - 1].matched = true;
      state[boardSize - 1][boardSize - 1].hidden = false;
    }

    shuffleState(state);

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
