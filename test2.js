

goOn = true
N = 0

waitingN = true
process.stdin.on('readable', () => {
    let chunk;
    // Use a loop to make sure we read all available data.
    while (goOn=((chunk = process.stdin.read()) !== null)) {
     if(waitingN){
        N = parseInt(chunk)
        waitingN = false
     }
    }
    if(!goOn){
        console.log("Bye!")
    }
    
  });