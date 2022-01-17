function (swarmName, constructor) {
    var args = Array.prototype.slice.call(arguments,2);
    var cmd = {
        sessionId        : this.sessionId,
        tenantId         : this.tenantId,
        swarmingName     : swarmName,
        command          : "start",
        ctor             : constructor,
        commandArguments : args
    };
    if(this.pendingCmds == null) {
        util.writeObject(this.sock,cmd);
    }
    else {
        this.pendingCmds.push(cmd);
    }
}