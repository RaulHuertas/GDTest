//RUN this file as : node test1.js
//Function definition
function minCost(N, H, M) {
  //console.log("H: " + H);
  //console.log("M: " + M);



  //UTILITIES
  totalCost = function (posibleIncrements) {//handy function to calculate cost
    var cost = 0;
    for (let i = 0; i < posibleIncrements.length; i++) {
      cost += (posibleIncrements[i]) * M[i]
    }
    return cost
  }

  areHeightsOkQ = function (posibleIncrements) {//handy function to check if the solution is Ok
    var ret = true;
    //console.log(`areHeightsOkQ, START, ${posibleIncrements}`)
    for (let i = 1; i < posibleIncrements.length; i++) {
      let prevTower = H[i - 1] + posibleIncrements[i - 1]
      let thisTower = H[i] + posibleIncrements[i]
      //console.log(`areHeightsOkQ, prevTower: ${prevTower}`)
      //console.log(`areHeightsOkQ, thisTower: ${thisTower}`)
      if (thisTower == prevTower) {
        //console.log('areHeightsOkQ, reject!')
        ret = false
        break;
      }
    }
    //console.log('areHeightsOkQ, END')
    return ret
  }


  //Cover a first acceptable initial case
  if(areHeightsOkQ(Array(N).fill(0))){    
    return 0
  }


  var result = -404
  maxNumber = Math.max(...H)
  minNumber = Math.min(...H)
  //Without taking cost into consideration, as a first aproximation, a safe way 
  //to have nonrepetitive heights is assign maxNumber+1,maxNumber+2, etc...
  //to the initially repetitive heights
  newPosibleValue = maxNumber + 1
  var firstIncrements = Array(N).fill(0)
  for (let i = 1; i < N; i++) {
    if (H[i] == H[i - 1]) {
      firstIncrements[i] = newPosibleValue - H[i]
      newPosibleValue++;
    }
  }
  var firstCost = totalCost(firstIncrements) 
  //We have a solution. Now we need to optimize it

  //Brute force aproach
  var bestCost = firstCost
  var bestOption = firstIncrements.slice()
  var proposition = Array(N).fill(0)
  let minIncrement = 0
  let maxIncrement = maxNumber+N

  // for (let i = 0; i < N; i++) {
  //   proposition[i] = maxIncrement
  // }
    
  for (let incr = minIncrement; incr <= maxIncrement; incr++) {
    for (let incr2 = minIncrement; incr2 < maxIncrement; incr2++) {
      for (let i = 0; i < N; i++) {
        proposition[i] = incr
      }
      if (!areHeightsOkQ(proposition)) {
        continue;
      }
      let proposedCost = totalCost(proposition);
      if (proposedCost < bestCost) {
        bestCost = proposedCost
        for (let p = 0; p < N; p++) {
          bestOption[p] = proposition[p]
        }
        console.log(`bestNewOption: ${bestOption}`)
      }
    }
    



  }

  
  console.log(`firstCost: ${firstCost}`)
  console.log(`firstIncrements: ${firstIncrements}`)
  console.log(`bestOption: ${bestOption}`)
  console.log(`areHeightsOkQ: ${areHeightsOkQ(bestOption)}`)

  return bestCost
}

//User input

//var temp = gets().trim('\n').split(/\n\s/)
var end = false
var waitingN = true
N = -1
H = []
M = []
readed = 0
var fs = require("fs");
const EventEmitter = require('events');
function stdinLineByLine() {
  const stdin = new EventEmitter();
  let buff = '';

  process.stdin
    .on('data', data => {
      buff += data;
      lines = buff.split(/\r\n|\n/);
      buff = lines.pop();
      lines.forEach(line => stdin.emit('line', line));
    })
    .on('end', () => {
      if (buff.length > 0) stdin.emit('line', buff);
    });

  return stdin;
}

function finalize() {
  finalV = minCost(N, H, M)
  process.exitCode = finalV
  console.log(finalV)
  process.exit(finalV)
}

const stdin = stdinLineByLine();
processLine = (line) => {
  if (line.length == 0) {
    //end 
    finalize()
  } else {
    if (waitingN) {
      temp = line.split(/\n|\s/)
      N = parseInt(temp[0])
      //console.log(`N: ${N}`)
      waitingN = false
    } else {
      temp = line.split(/\n|\s/)
      //console.log(`H: ${temp[0]}`)
      //console.log(`M: ${temp[1]}`)
      H.push(parseInt(temp[0]))
      M.push(parseInt(temp[1]))
      readed++
      if (readed == N) {
        finalize()
      }
    }
  }
}
stdin.on('line', processLine);


