function(phaseName,nodeHint){
    if(this.debug == "swarm"){
        cprint("Swarm debug: " + this.swarmingName +" phase: " + phaseName);
    }

    this.currentPhase = phaseName;
    var targetNodeName = nodeHint;
    if(nodeHint == undefined){
        targetNodeName = thisAdaptor.compiledSwarmingDescriptions[this.swarmingName][phaseName].node;
    }
    if(this.debug == "swarm"){
            cprint("[" +thisAdaptor.nodeName + "] is sending command to [" + targetNodeName + "]: " + JSON.stringify(this));
    }
    redisClient.publish(targetNodeName,JSON.stringify(this));
}