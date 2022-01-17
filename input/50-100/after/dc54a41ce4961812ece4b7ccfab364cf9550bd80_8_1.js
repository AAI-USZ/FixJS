function(level,message,errText,stack){
        this.nodeName       = thisAdaptor.nodeName;
        this.message        = message;
        this.errText        = errText;
        this.stack          = stack;
        this.level          = level;
        this.swarm("doLog");
    }