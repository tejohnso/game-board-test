const assert = require("assert"),
handler = require("../app/clickhandler.js");

var event; 

describe("Click Handler", ()=>{
  beforeEach(()=>{
    event = {
      offsetX: 0,
      offsetY: 0,
      currentTarget: null,
    };
  });

  it("converts a click to the top left grid point", ()=>{
    event.offsetX = 1;
    event.offsetY = 1;

    assert.deepEqual(handler.resolveCoords(event), [0, 0]);
  });

  it("converts a click to the top right grid point", ()=>{
    event.offsetX = 250;
    event.offsetY = 80;

    assert.deepEqual(handler.resolveCoords(event), [0, 2]);
  });

  it("converts a click to the middle bottom grid point", ()=>{
    event.offsetX = 101;
    event.offsetY = 201;

    assert.deepEqual(handler.resolveCoords(event), [2, 1]);
  });

  it("returns a handler function to attach to click events", ()=>{
    assert.ok(typeof handler.getHandler(), "function");
  });

  it("handles a click event by requesting a state update", ()=>{
    var activated = false,
    stateController = {activateSquare() {activated = true;}};

    handler.getHandler(stateController)(event);
    assert.ok(activated);
  });
});
