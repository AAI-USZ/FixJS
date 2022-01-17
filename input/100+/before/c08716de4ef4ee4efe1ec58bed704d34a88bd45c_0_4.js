function (swarmingName){
    var swarming = new SwarmingPhase(swarmingName,"start");
    //console.log(thisAdaptor.compiledWaves[swarmingName]);
    var initVars = thisAdaptor.compiledSwarmingDescriptions[swarmingName].vars;
    for (var i in initVars){
        swarming[i] = initVars[i];
    }
    swarming.command = "phase";
    var start = thisAdaptor.compiledSwarmingDescriptions[swarmingName]["start"];
    var argsArray = Array.prototype.slice.call(arguments);
    argsArray.shift();
    try{
        start.apply(swarming,argsArray);
    }
    catch (err){
        printPhaseError(err,swarmingPhase.swarmingName,"start","none");
    }

}