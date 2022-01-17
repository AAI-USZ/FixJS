function(message,err){
    var errStr;
    var stack;
    dprint("Logging error: " + message);
    if(err != null && err != undefined){
        errStr = err.toString();
        stack = err.stack;
    }
    startSwarm("log.js","err",["ERROR",message,errStr,stack]);
}