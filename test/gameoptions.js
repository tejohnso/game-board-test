const assert = require("assert"),
gameOptions = require("../app/gameoptions.js");

describe("Game Options", ()=>{
  it("returns minimums on non integer options", ()=>{
    var options = {
      boardSize: "abc",
      squareSize: "def"
    };

    assert.deepEqual(gameOptions.validate(options), gameOptions.minimums());
  });

  it("can accept new minimums", ()=>{
    var options = {boardSize: "abc", squareSize: "def"},
    mins = {boardSize: 75, squareSize: 25};

    gameOptions.minimums(mins);
    assert.deepEqual(gameOptions.validate(options), mins);
  });

  it("returns minimums greater than 1 for negative options", ()=>{
    var options = {boardSize: "-1", squareSize: "-1"};

    assert.deepEqual(gameOptions.validate(options), gameOptions.minimums());
  });
});
