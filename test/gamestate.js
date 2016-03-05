const assert = require("assert"),
gamestate = require("../app/gamestate.js");

describe("Game State", ()=>{
  beforeEach(()=>{
    gamestate.initializeState(3);
  });

  it("does nothing if no square is passed", ()=>{
    assert.equal(gamestate.activateSquare(), undefined);
  });

  it("adds a selection to the top row, leftmost column", ()=>{
    assert.deepEqual(gamestate.activateSquare([0, 0]), [[1, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });

  it("adds a selection to the second row, leftmost column", ()=>{
    assert.deepEqual(gamestate.activateSquare([1, 0]), [[0, 0, 0], [1, 0, 0], [0, 0, 0]]);
  });

  it("adds a selection to the last row, last column", ()=>{
    assert.deepEqual(gamestate.activateSquare([2, 2]), [[0, 0, 0], [0, 0, 0], [0, 0, 1]]);
  });

  it("calls observers on update", ()=>{
    return new Promise((res)=>{
      gamestate.observe((state)=>{
        if (state) {res();}
      });
      gamestate.activateSquare([1, 1]);
    });
  });

  it("resets state on full board", ()=>{
    assert.deepEqual(gamestate.activateSquare([0, 0]), [[1, 0, 0],[0, 0, 0],[0, 0, 0]]);
    gamestate.activateSquare([0, 1]);
    gamestate.activateSquare([0, 2]);
    gamestate.activateSquare([1, 0]);
    gamestate.activateSquare([1, 1]);
    gamestate.activateSquare([1, 2]);
    gamestate.activateSquare([2, 0]);
    gamestate.activateSquare([2, 1]);
    assert.deepEqual(gamestate.activateSquare([2, 2]), [[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
  });
});
