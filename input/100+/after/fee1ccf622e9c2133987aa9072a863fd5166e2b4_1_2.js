function(socketParam, thisAdaptor,onLoginCallback){
    var outlet={
        thisAdaptor: thisAdaptor,
        onLoginCallback:onLoginCallback,
        pendingCmds: new Array(),
        redisClient:null,
        socket:socketParam,
        sessionId:null,
        loginSwarmingVariables:null,
        isClosed:false,
        userId:null,
        parser:null,
        onChannelNewMessage:function (channel, message) {
            var json = JSON.parse(message);
            message = JSON.stringify(json);
            dprint("Received " + message);
            util.writeSizedString(this.socket,message);
        },
        successfulLogin:function (swarmingVariables) {
            this.loginSwarmingVariables = swarmingVariables;
            this.userId = swarmingVariables.userId;
            this.currentExecute = this.executeSafe;
            this.onLoginCallback(this);
        },
        close:function () {
            if(!this.isClosed){
                logInfo("Closing session " + this.sessionId)
                if(this.redisClient != null){
                    this.redisClient.quit();
                }
                delete thisAdaptor.connectedOutlets[this.sessionId];
                this.socket.destroy();
                this.isClosed = true;
            }
        },
        currentExecute:null,
        execute : function(messageObj){
            if(this.pendingCmds != null){
                this.pendingCmds.push(messageObj);
            }
            else{
                this.currentExecute(messageObj);
            }
        },
        sendPendingCmds:function(){
            for (var i = 0; i < this.pendingCmds.length; i++) {
                this.currentExecute(this.pendingCmds[i]);

            }
            this.pendingCmds = null;
        },
        executeButNotAuthenticated : function (messageObj){
            if(messageObj.swarmingName != thisAdaptor.loginSwarmingName ){
                logErr("Could not execute [" +messageObj.swarmingName +"] swarming without being logged in");
                this.close();
            }
            else{
                this.executeSafe(messageObj);
            }
        },
        checkPolicy:null,
        executeSafe : function (messageObj){
            beginContext(messageObj);
            if(messageObj.command == "start"){
                var ctorName = "start";
                if(messageObj.ctor != undefined){
                    ctorName = messageObj.ctor;
                }

                var swarming = new adaptor.SwarmingPhase(messageObj.swarmingName,ctorName);
                var initVars = thisAdaptor.compiledSwarmingDescriptions[messageObj.swarmingName].vars;
                for (var i in initVars){
                    swarming[i] = initVars[i];
                }
                for (var i in messageObj){
                    swarming[i] = messageObj[i];
                }
                swarming.command = "phase";
                var start = thisAdaptor.compiledSwarmingDescriptions[messageObj.swarmingName][ctorName];
                var args = messageObj.commandArguments;
                delete swarming.commandArguments;
                try{
                    start.apply(swarming,args);
                }
                catch (err){
                    logErr("Execution error ",err);
                }
            }
            else
            if(messageObj.command == "phase"){
                var swarming = new adaptor.SwarmingPhase(messageObj.swarmingName,messageObj);
                swarming.swarm(swarming.currentPhase);
            }
            else{
                logErr("["+thisAdaptor.nodeName +"] I don't know what to execute "+ JSON.stringify(messageObj));
            }
            endContext();
        }
    };


    outlet.sessionId = uuid.v4();
    var indentifyCmd = {
        sessionId        : outlet.sessionId,
        swarmingName     : "login.js",
        command          : "identity"
    };

    util.writeObject(socketParam,indentifyCmd);
    thisAdaptor.connectedOutlets[outlet.sessionId] = outlet;

    outlet.currentExecute = outlet.executeButNotAuthenticated;
    outlet.redisClient = redis.createClient(thisAdaptor.redisPort,thisAdaptor.redisHost);

    var channel = thisAdaptor.coreId+outlet.sessionId;
    dprint("Subscribing to channel " + channel );
    outlet.redisClient.subscribe(channel);
    outlet.redisClient.on("message",outlet.onChannelNewMessage.bind(outlet));

    outlet.parser = util.createFastParser(outlet.execute.bind(outlet));
    outlet.checkPolicy = checkPolicy;
    socketParam.on('data', function (data){
        var utfData = data.toString('utf8');
        if(this.checkPolicy != null){
            var check = this.checkPolicy;
            this.checkPolicy = null;
            if(check (utfData)){
                return;
            }
            //normal message,continue
        }
        this.parser.parseNewData(utfData);
    }.bind(outlet));

     outlet.redisClient.on("connect",function(){
            outlet.sendPendingCmds();
        }.bind(outlet));

    socketParam.on('error',outlet.close.bind(outlet));
    socketParam.on('close',outlet.close.bind(outlet));
    return outlet;
}