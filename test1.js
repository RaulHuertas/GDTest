//RUN this file as : node test1.js
//Function definition
function minCost(N, H, M) {
  console.log("H: " + H);
  console.log("M: " + M);
  var result = -404
  maxNumber = Math.max(...H)
  //Without taking cost into consideration, as a first aproximation, a safe way 
  //to have nonrepetitive heights is assign maxNumber+1,maxNumber+2, etc...
  //to the initially repetitive heights
  newPosibleValue = maxNumber + 1
  firstIncrements = Array(N).fill(0)
  for (let i = 1; i < N; i++) {
    if (H[i] == H[i - 1]) {
      firstIncrements[i] = newPosibleValue - H[i]
      newPosibleValue++;
    }
  }
  //We have a solution. Now we need to optimize it
  totalCost = function (posibleIncrements) {//handy function to calculate cost
    var cost = 0;
    for (let i = 0; i < posibleIncrements.length; i++) {
      cost += (posibleIncrements[i]) * M[i]
    }
    return cost
  }

  areHeightsOkQ = function (posibleIncrements) {//handy function to check if teh solution is Ok
    var ret = true;
    console.log(`areHeightsOkQ, START, ${posibleIncrements}`)
    for (let i = 1; i < posibleIncrements.length; i++) {
      let prevTower = H[i - 1] + posibleIncrements[i - 1]
      let thisTower = H[i] + posibleIncrements[i]
      console.log(`areHeightsOkQ, prevTower: ${prevTower}`)
      console.log(`areHeightsOkQ, thisTower: ${thisTower}`)
      if (thisTower == prevTower) {
        console.log('areHeightsOkQ, reject!')
        ret = false
        break;
      }
    }
    console.log('areHeightsOkQ, END')
    return ret
  }
  var initialCost = totalCost(firstIncrements)
  var currentCost = initialCost
  maxIncrement = Math.max(...firstIncrements)
  newCost = -1
  console.log("max: " + maxNumber);
  console.log("maxIncrement: " + maxIncrement);
  console.log("naive cost: " + currentCost);
  var bestIncrements = firstIncrements.slice()
  while (newCost != currentCost) {
    //var posibleIncrements = bestIncrements.slice()
    for (let i = (N-1); i >= 0; i--) {//because of our first aproximation, the last increments are initially the highest, 
        if((bestIncrements[i-1] == 0)&&(bestIncrements[i] == 0)) {
            //no need to change this values
            continue
        }
        var newProposition
        //at least two posibilities, decrease left or right 
        var posibility1 = bestIncrements.slice()
        if(posibility1[i-1]>0){
          posibility1[i-1]--
        }
        p1okQ = areHeightsOkQ(posibility1)
        var posibility2 = bestIncrements.slice()
        if(posibility2[i]>0){
          posibility2[i]--
        }
        p2okQ = areHeightsOkQ(posibility2)
        if(p1okQ&&p2okQ){
          costleft =  totalCost(posibility1);
          costRight =  totalCost(posibility2);
          if(costleft<costRight){
            newProposition = posibility1
          }else{
            newProposition = posibility2
          }
        }else if(p1okQ){
          newProposition = posibility1
        }else if(p2okQ){
          newProposition = posibility2
        }else{
          newCost = currentCost
          continue
        }
        proposedCost = totalCost(newProposition)
        if(proposedCost<currentCost){
          currentCost = proposedCost
          newCost = proposedCost
          bestIncrements = newProposition
        }else{
          newCost = currentCost
        }
    }
    //newCost = totalCost(bestIncrements)
  }
  console.log(`firstIncrements: ${firstIncrements}`)
  console.log(`bestIncrements: ${bestIncrements}`)
  console.log(`okQ: ${totalCost(bestIncrements)}`)

  return totalCost(bestIncrements)
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
const stdin = stdinLineByLine();
processLine = (line) => {
  if (line.length == 0) {
    //end 
    console.log(minCost(N, H, M))
    process.exit()
  } else {
    if (waitingN) {
      temp = line.split(/\n|\s/)
      N = parseInt(temp[0])
      console.log(`N: ${N}`)
      waitingN = false
    } else {
      temp = line.split(/\n|\s/)
      console.log(`H: ${temp[0]}`)
      console.log(`M: ${temp[1]}`)
      H.push(parseInt(temp[0]))
      M.push(parseInt(temp[1]))
      readed++
      if (readed == N) {
        console.log(minCost(N, H, M))
        process.exit()
      }
    }
  }
}
stdin.on('line', processLine);


