const assert = require("assert"),
gamestate = require("../app/gamestate.js");

describe("Game State", ()=>{
  beforeEach(()=>{
    gamestate.initializeState(4, 4);
  });

  it("does nothing if no square is passed", ()=>{
    assert.deepEqual(gamestate.activateSquare(), gamestate.activateSquare());
  });

  it("makes a selection to the top row, leftmost column", ()=>{
    assert.equal(gamestate.activateSquare([0, 0])[0][0].hidden, false);
  });

  it("makes a selection to the second row, leftmost column", ()=>{
    assert.equal(gamestate.activateSquare([1, 0])[1][0].hidden, false);
  });

  it("makes a selection to the last row, last column", ()=>{
    assert.equal(gamestate.activateSquare([3, 3])[3][3].hidden, false);
  });

  it("hides previous selection if not a match", ()=>{
    var state = gamestate.activateSquare([0, 0]),
    nonMatch = state[0][0].id !== state[0][1].id ? 1 : 2;

    state = gamestate.activateSquare([0, nonMatch]);
    assert.ok(state[0][0].hidden);
    assert.ok(!state[0][nonMatch].hidden);
  });

  it("leaves both squares visible if matching", ()=>{
    var state = gamestate.activateSquare([0, 0]),
    match = (function findMatch() {
      for (var i = 4; i; i -= 1) {
        for (var j = 4; j; j -= 1) {
          if (state[i - 1][j - 1].id === state[0][0].id) {
            return [i - 1, j - 1];
          }
        }
      }
    }());

    assert.ok(!state[0][0].matched);
    assert.ok(!state[match[0]][match[1]].matched);

    state = gamestate.activateSquare(match);

    assert.ok(state[0][0].matched);
    assert.ok(state[match[0]][match[1]].matched);
    assert.ok(!state[0][0].hidden);
    assert.ok(!state[match[0]][match[1]].hidden);
  });

  it("calls observers on update", ()=>{
    return new Promise((res)=>{
      gamestate.observe((state)=>{
        if (state) {res();}
      });
      gamestate.activateSquare([1, 1]);
    });
  });

  it("reveals unmatched square for odd number of squares", ()=>{
    var state = gamestate.initializeState(3, 3);
    assert.ok(state.some((row)=>{
      return row.some((tileState)=>{
        return tileState.matched && !tileState.hidden;
      });
    }));
  });

  it("resets state on fully matched board", ()=>{
    var id, state;

    function findMatch(id) {
      for (var i = 4; i; i -= 1) {
        for (var j = 4; j; j -= 1) {
          if (state[i - 1][j - 1].id === id) {
            return [i - 1, j - 1];
          }
        }
      }
    }

    for (var i = 4; i; i -= 1) {
      for (var j = 4; j; j -= 1) {
        state = gamestate.activateSquare([i - 1, j - 1]);
        id = state[i - 1][j - 1].id;
        gamestate.activateSquare(findMatch(id));
      }
    }

    assert(gamestate.wins() > 0);
  });
});
