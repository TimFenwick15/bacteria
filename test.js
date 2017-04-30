const rewire = require('rewire');
const assert = require('chai');
const script = rewire('./script.js');
const runSimulation = script.__get__('runSimulation');

describe('runSimulation', function() {
  it('Test Case 1: Basic case', function() {
    const simulation = new runSimulation([[1,2],[2,2],[3,2],[-1,-1]]);
    assert.expect(simulation.getList()).to.deep.equal([[2,1],[2,2],[2,3],[-1,-1]]);
  });
  it('Test Case 2: Large, seperated  numbers', function() {
    const simulation = new runSimulation([[1,2],[2,2],[3,2],[1000000001,1000000002],[1000000002,1000000002],[1000000003,1000000002],[-1,-1]]);
    assert.expect(simulation.getList()).to.deep.equal([[2,1],[2,2],[2,3],[1000000002,1000000001],[1000000002,1000000002],[1000000002,1000000003],[-1,-1]]);
  });
  it('Test Case 3: Close to x axis', function() {
    const simulation = new runSimulation([[1,0],[2,0],[3,0],[-1,-1]]);
    assert.expect(simulation.getList()).to.deep.equal([[2,0],[2,1],[-1,-1]]);
  });
  it('Test Case 4: CLose to y axis', function() {
    const simulation = new runSimulation([[0,1],[0,2],[0,3],[-1,-1]]);
    assert.expect(simulation.getList()).to.deep.equal([[0,2],[1,2],[-1,-1]]);
  });
  it('Test Case 5: Close to X and Y axis', function() {
    const simulation = new runSimulation([[0,0],[1,0],[2,0],[-1,-1]]);
    assert.expect(simulation.getList()).to.deep.equal([[1,0],[1,1],[-1,-1]]);
  });
});
