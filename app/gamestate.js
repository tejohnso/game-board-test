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

    state[coord[0]][coord[1]] = 1;
    if (module.exports.checkFull()) {
      module.exports.initializeState(state.length);
    } else {
      updateObservers();
    }

    return state;
  },
  initializeState(size) {
    if (!Number.isInteger(size)) {size = 3;}
    if (size < 2) {size = 3;}

    state = Array(size).fill(" ").map((row)=>{
      return Array(size).fill(0);
    });

    updateObservers();
  },
  observe(cb) {
    observers.push(cb);
  },
  checkFull() {
    return state.every((row)=>{
      return row.every((col)=>{
        return col;
      });
    });
  }
};
