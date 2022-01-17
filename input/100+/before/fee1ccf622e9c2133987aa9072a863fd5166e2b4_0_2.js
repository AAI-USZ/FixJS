function onMessageFromQueue(initVars, rawMessage) {
    beginContext(initVars);
    var swarmingPhase = new SwarmingPhase(initVars.swarmingName, initVars.currentPhase);
    thisAdaptor.msgCounter++;
    for (var i in initVars) {
        swarmingPhase[i] = initVars[i];
    }
    if (swarmingPhase.debug == "true") {
        cprint("[" + thisAdaptor.nodeName + "] received from channel [" + initVars.channel + "]: " + rawMessage);
    }
    var phaseFunction = thisAdaptor.compiledSwarmingDescriptions[swarmingPhase.swarmingName][swarmingPhase.currentPhase].code;
    if (phaseFunction != null) {
        try {
            phaseFunction.apply(swarmingPhase);
        }
        catch (err) {
            util.perror(err, swarmingPhase.swarmingName, swarmingPhase.currentPhase, swarmingPhase);
        }
    }
    else {
        if (thisAdaptor.onMessageCallback != null) {
            thisAdaptor.onMessageCallback(message);
        }
        else {
            Console.log("DROPPING unknown message: " + rawMessage);
        }
    }
    endContext();
}