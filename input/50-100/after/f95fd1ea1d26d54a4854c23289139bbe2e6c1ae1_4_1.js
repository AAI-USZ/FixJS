function defaultLogin(sock,clientName,pass){
    var cmd={
        authorisationToken:"ok",
        sessionId:clientName,
        swarmingName:"login.js",
        command:"start",
        //userId:null,
        commandArguments:[clientName,clientName,pass]
    };
    //console.log(JSON.stringify(cmd));
    util.writeObject(sock,cmd);
}