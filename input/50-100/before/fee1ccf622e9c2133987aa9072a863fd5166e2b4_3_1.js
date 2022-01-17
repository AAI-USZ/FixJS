function(message,err){
    var errStr;
    var stack;
    if(err!=null){
        errStr = err.toString();
        stack = err.stack();
    }
    startSwarm("log.js","start",[message,errStr,stack,"ERROR",executionContext.userId,executionContext.tenantId,executionContext.sessionId]);
}