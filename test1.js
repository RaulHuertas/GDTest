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
processLine = (line)=>{
console.log("**** "+line)
}
stdin.on('line', processLine);


//Obtain result

console.log(minCost(N,H,M))

