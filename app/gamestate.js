var state = initialState(),
observers = [];

function updateObservers() {
  observers.forEach((observer)=>{
    observer(state);
  });
}

function initialState() {
  return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

module.exports = {
  activateSquare(coord) {
    if (!coord) {return;}

    state[coord[0]][coord[1]] = 1;
    if (module.exports.checkFull()) {state = initialState();}

    updateObservers();
    return state;
  },
  resetState() {
    state = initialState();
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
