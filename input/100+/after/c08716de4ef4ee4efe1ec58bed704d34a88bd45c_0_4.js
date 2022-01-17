function(swarmingName,ctorName){

    var swarming = new SwarmingPhase(swarmingName,ctorName);
    //console.log(thisAdaptor.compiledWaves[swarmingName]);
    var initVars = thisAdaptor.compiledSwarmingDescriptions[swarmingName].vars;
    for (var i in initVars){
        swarming[i] = initVars[i];
    }
    swarming.command = "phase";
    var start = thisAdaptor.compiledSwarmingDescriptions[swarmingName][ctorName];
    var argsArray = Array.prototype.slice.call(arguments,1);
    argsArray.shift();
    try{
        start.apply(swarming,argsArray);
    }
    catch (err){
        perror(err,"Ctor error caught in ["+ thisAdaptor.nodeName + "] for swarm \"" + swarmingName + "\" phase {"+ ctorName+"} Context:\n" + nutil.inspect(swarming),true);
    }
}