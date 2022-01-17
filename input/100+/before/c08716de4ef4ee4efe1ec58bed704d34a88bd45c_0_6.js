function(socketParam){
    var outlet={
        redisClient:null,
        socket:socketParam,
        sessionId:null,
        loginSwarmingVariables:null,
        waitingMsg:null,
        isClosed:false,
        onChannelNewMessage:function (channel, message) {
            //console.log("Waw: " + message);
            util.writeSizedString(this.socket,message);
        },
        successfulLogin:function (swarmingVariables) {

            this.loginSwarmingVariables = swarmingVariables;
            this.currentExecute = this.executeSafe;
        },
        close:function () {
            if(!this.isClosed){
                console.log("Closing outlet " + this.sessionId)
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
            this.currentExecute(messageObj);
        },
        executeButNotIdentified : function (messageObj){
            if(messageObj.sessionId == null){
                console.log("Wrong begin message" + JSON.stringify(messageObj));
                this.close();
                return;
            }
            var existingOultet = thisAdaptor.connectedOutlets[messageObj.sessionId];
            if( existingOultet != null){
                console.log("Disconnecting already connected session " + JSON.stringify(messageObj));
                existingOultet.close(); //disconnect the other client,may be is hanging..
            }

            thisAdaptor.connectedOutlets[messageObj.sessionId] = this;

            this.sessionId = messageObj.sessionId;
            this.currentExecute = this.executeButNotAuthenticated;
            this.redisClient = redis.createClient(thisAdaptor.redisPort,thisAdaptor.redisHost);
            this.redisClient.subscribe(this.sessionId);
            this.redisClient.on("message",this.onChannelNewMessage.bind(this));

            outlet.waitingMsg = messageObj;;
            this.redisClient.on("connect",function(){
                    this.executeButNotAuthenticated(this.waitingMsg);
            }.bind(this));
        },
        executeButNotAuthenticated : function (messageObj){
            if(messageObj.swarmingName != thisAdaptor.loginSwarmingName ){
                Console.log("Could not execute [" +messageObj.swarmingName +"] swarming without being logged in");
                this.close();
            }
            else{
                this.executeSafe(messageObj);
            }
        },
        executeSafe : function (messageObj){
                if(messageObj.command == "start"){
                    var swarming = new SwarmingPhase(messageObj.swarmingName,"start");
                    //console.log("Execute debug: " + JSON.stringify(messageObj))
                    //console.log(thisAdaptor.compiledWaves[swarmingName]);
                    var initVars = thisAdaptor.compiledSwarmingDescriptions[messageObj.swarmingName].vars;
                    for (var i in initVars){
                        swarming[i] = initVars[i];
                    }
                    for (var i in messageObj){
                        swarming[i] = messageObj[i];
                    }
                    swarming.command = "phase";
                        var start = thisAdaptor.compiledSwarmingDescriptions[messageObj.swarmingName]["start"];
                    var args = messageObj.commandArguments;
                    delete swarming.commandArguments;
                    try{
                        start.apply(swarming,args);
                    }
                    catch (err){
                        printPhaseError(err,messageObj.swarmingName,"start","none");
                    }
                }
                else
                if(messageObj.command == "phase"){
                    var swarming = new SwarmingPhase(messageObj.swarmingName,messageObj);
                    swarming.swarm(swarming.currentPhase);
                }
                else{
                    Console.log("["+thisAdaptor.nodeName +"] I don't know what to execute "+ JSON.stringify(messageObj));
                }
            }
    };
    outlet.currentExecute = outlet.executeButNotIdentified;
    var parser = util.createFastParser(outlet.execute.bind(outlet));

    socketParam.on('data', function (data){
        parser.parseNewData(data.toString('utf8'));
        //parser.parseNewData(data.toString('utf8');
    });

    socketParam.on('error',outlet.close.bind(outlet));
    socketParam.on('close',outlet.close.bind(outlet));

    return outlet;
}