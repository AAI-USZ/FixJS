function (channel, message) {
        //continue swarmingPhase
        var initVars = JSON.parse(message);
        if(initVars.scope == "broadcast"){
            onBroadcast(initVars);
        }
        else{
            onMessageFromQueue(initVars,message);
        }
    }