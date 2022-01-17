function(message,errText,stack,level,tenantId,sessionId){
        this.message    = message;
        this.errText    = errText;
        this.stack      = stack;
        this.level      = level;
        this.tenantId   = tenantId;
        this.sessionId   = sessionId;
        this.swarm("doLog");
    }