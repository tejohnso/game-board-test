module.exports = {
  resolveCoords(e) {
    return [getSquare(e.offsetY), getSquare(e.offsetX)];

    function getSquare(offset) {
      return Math.floor(offset / 100);
    }
  },
  getHandler(stateController) {
    return function(e) {
      stateController.activateSquare(module.exports.resolveCoords(e));
    };
  }
};
