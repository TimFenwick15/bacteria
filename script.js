// The initial data to use
//let data = [ [1,2], [2,2], [3,2], [-1,-1];
let data = [
  [1,2],
  [2,2],
  [3,2],
  [1000000001,1000000002],
  [1000000002,1000000002],
  [1000000003,1000000002],
  [-1,-1]
];

// Individual bacteria object
const bacteria = function(x, y, state = 1) {

  // Reject negative coordinates
  if (x < 0 || y < 0)
    return null;

  // Create a unique string and store it so we don't duplicate bacteria
  const hash = 'x' + x + 'y' + y;

  // If we haven't made the hashList yet, create it
  if (!this.__proto__.hashList)
    this.__proto__.hashList = [];

  // If we've created this already, exit here
  if (this.hashList.includes(hash))
    return null;

  this.x = x;
  this.y = y;
  this.neighbourCount = 0;
  this.state = state;
  this.hashList.push(hash);
}

// Create bacteria objects and advance a generation
const runSimulation = function(input) {

  // Initialise the bacteria hash list
  bacteria.prototype.hashList = [];

  // Run the simulation for one generation
  this.list = input.map(x => new bacteria(x[0], x[1]));
  this.addInactiveBacteria();
  this.addNeighbourCounts();
  this.applyRules();
}

// 1. Add neighbours of existing bacteria as inactive bacteria
// These are the sites where we will potentially gain new bacteria
runSimulation.prototype.addInactiveBacteria = function () {
  const initialCount = this.list.length;

  // Loop over the list of bacteria
  for (let i = 0; i < initialCount; i++) {

    // Check the 8 neighbouring sites to this one
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        let testSite = new bacteria(this.list[i].x + k - 1, this.list[i].y + j - 1, 0);

        // Check that the bacteria returned is valid
        if (Object.keys(testSite).length)
          this.list = this.list.concat(testSite);
      }
    }
  }
};

// 2. Add the number of live neighbours to each bacteria site we have stored
runSimulation.prototype.addNeighbourCounts = function() {
  // Loop over every bacteria in the list
  for (let i = 0; i < this.list.length; i++) {
    
    // Check if any of the live bacteria in the list are neighbours
    this.list.forEach(x => {
      if (x.state &&
          Math.abs(this.list[i].x - x.x) <= 1 &&
          Math.abs(this.list[i].y - x.y) <= 1 &&
          !(this.list[i].x === x.x && this.list[i].y === x.y))
        this.list[i].neighbourCount++;
    });
  }
};

// 3. Apply the simulation rules
runSimulation.prototype.applyRules = function() {
  this.list.forEach(x => {

    // Rules 1 and 3
    if (x.state && (x.neighbourCount < 2 || x.neighbourCount > 3))
      x.state = 0;

    // Rule 4
    if (!x.state && x.neighbourCount === 3)
      x.state = 1;
    });
  };

// 4. Return the final data in the same form as the input
runSimulation.prototype.getList = function() {
  
  // Make sure the data is returned in the order it arrived
  const sortY = function(a, b) {
    if (a.y < b.y)
      return - 1;
    if (a.y > b.y)
      return 1;
    return 0;
  }
  const sortX = function(a,b) {
    if (a.x < b.x)
      return - 1;
    if (a.x > b.x)
      return 1;
    return 0;
  }
  return this.list
    .filter(x => x.state === 1)
    .sort(sortY)
    .sort(sortX)
    .map(x => [x.x, x.y])
    .concat([[-1,-1]]);
}

for (let i = 0; i < 1; i++) {
  const simulation = new runSimulation(data);
  data = simulation.getList();
}
console.log(data);

