module.exports = {
  resolveCoords(e) {
    console.log(e);

    return [getSquare(e.offsetY), getSquare(e.offsetX)];

    function getSquare(offset) {
      var square = 1;
      if (offset < 100) {square = 0;}
      if (offset > 200) {square = 2;}
      return square;
    }
  },
  getHandler(stateController) {
    return function(e) {
      stateController.activateSquare(module.exports.resolveCoords(e));
    };
  }
};
