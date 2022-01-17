function(message,aspect,err){
    var errStr;
    var stack;
    if(err!=null){
        errStr = err.toString();
        stack = err.stack();
    }
    if(aspect == undefined){
        aspect = "DEBUG";
    }
    startSwarm("log.js","start",[message,errStr,stack,aspect,executionContext.tenantId,executionContext.sessionId]);
}