//RUN this file as : node test1.js
//Function definition
function minCost(N,H,M){
    var result = -404

    return result
}

//User input

//var temp = gets().trim('\n').split(/\n\s/)
var end = false
var waitingN = true
N = -1
H = []
M = []
//readed = 0
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
processLine = (line)=>{
  if(line.length==0){
    //end 
    console.log(minCost(N,H,M))
    process.exit()
  }else{
    if(waitingN){
        temp = line.split(/\n|\s/)
        N = parseInt(temp[0])
        console.log(`N: ${N}`)
        waitingN = false
    }else{
      temp = line.split(/\n|\s/)
      console.log(`H: ${temp[0]}`)
      console.log(`M: ${temp[1]}`)
    }
  }
}
stdin.on('line', processLine);

