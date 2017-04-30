Simulate a 2D grid of bacteria using ES6 Javascript (requires a modern browser or recent NodeJS version)

To run, either:
- Open index.html in a browser
- Using NodeJS, run $node script.js

To run the tests using NodeJS:
- Go to the project directory
- Run $npm install
- Run $npm run test

The steps for this simulation are:
- Read the initial data and store using the bacteria object
- Create a list of these objects in the runSimulation object
- For each blank neighbouring site to a bacteria, create an inactive bacteria. These are the site where we potentially create new bacteria
- On each bacteria object, add a count of the number of active neighbours it has
- Apply the simulation rules
  - If an active bacteria has < 2 or > 3, it becomes inactive
  - If an inactive bacteria has exactly 3 neighbours, it becomes active
- Output the data in the same form as it was provided, sorted, with inactive sites filtered out, and with a terminating [-1,-1] site
