var minimums = {
  boardSize: 3,
  squareSize: 5
};

module.exports = {
  validate(options) {
    Object.keys(options).forEach((key)=>{
      options[key] = parseInt(options[key]);
      (Number.isInteger(options[key])) || (options[key] = minimums[key]);
      (options[key] >= minimums[key]) || (options[key] = minimums[key]);
    });

    return options;
  },
  minimums(mins) {
    if (!mins) {return minimums;}

    minimums.boardSize = 1;
    minimums.squareSize = 1;

    minimums = module.exports.validate(mins);
    return module.exports;
  }
};
