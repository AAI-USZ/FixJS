function (swarmingName, ctorName) {

    var swarming = new SwarmingPhase(swarmingName, ctorName);
    var initVars = thisAdaptor.compiledSwarmingDescriptions[swarmingName].vars;
    for (var i in initVars) {
        swarming[i] = initVars[i];
    }
    swarming.command = "phase";
    var start = thisAdaptor.compiledSwarmingDescriptions[swarmingName][ctorName];

    var args = []; // empty array
    // copy all other arguments we want to "pass through"
    for(var i = 2; i < arguments.length; i++){
        args.push(arguments[i]);
    }

    try {
        start.apply(swarming, args);
    }
    catch (err) {
        logErr("Ctor error caught in [" + thisAdaptor.nodeName + "] for swarm \"" +
                swarmingName + "\" phase {" + ctorName + "} Context:\n" + nutil.inspect(swarming),
            err);
    }
}