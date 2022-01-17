function (sessionId,user,pass) {
    var cmd = {
        sessionId        : sessionId,
        swarmingName     : "login.js",
        command          : "start",
        commandArguments : [sessionId, user, pass]
    };
    util.writeObject(this.sock,cmd);
}