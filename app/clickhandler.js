module.exports = {
  resolveCoords(e, pixelsPerSquare) {
    (Number.isInteger(pixelsPerSquare)) || (pixelsPerSquare = 100);
    return [getSquare(e.offsetY), getSquare(e.offsetX)];

    function getSquare(offset) {
      return Math.floor(offset / pixelsPerSquare);
    }
  },
  getHandler(stateController, pixelsPerSquare) {
    return function(e) {
      stateController.activateSquare
      (module.exports.resolveCoords(e, pixelsPerSquare));
    };
  }
};
