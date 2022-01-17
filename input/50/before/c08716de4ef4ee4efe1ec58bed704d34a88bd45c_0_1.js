function (channel, message) {
        //continue swarmingPhase
        var initVars = JSON.parse(message);
        if(initVars.scope == "broadcast"){
            thisAdaptor.onBroadcast(initVars);
        }
        else{
            thisAdaptor.onMessageFromQueue(initVars,message);
        }
    }