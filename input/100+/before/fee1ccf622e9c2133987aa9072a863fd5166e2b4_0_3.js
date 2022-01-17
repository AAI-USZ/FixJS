function (phaseName, nodeHint) {
    try{
        if (this.debugSwarm == "true") {
            cprint("(Swarm debug) on adaptor {" + thisAdaptor.nodeName + "} swarming: " + this.swarmingName + " phase: " + phaseName);
        }

        this.currentPhase = phaseName;
        var targetNodeName = nodeHint;
        if (nodeHint == undefined) {
            targetNodeName = thisAdaptor.compiledSwarmingDescriptions[this.swarmingName][phaseName].node;
        }
        if (this.debugSwarm == "true") {
            cprint("(Swarm debug) on adaptor {" + thisAdaptor.nodeName + "} is sending command to [" + targetNodeName + "]: " + JSON.stringify(this));
        }
        redisClient.publish(thisAdaptor.shardId+targetNodeName, JSON.stringify(this),function (err,res){
            if(err != null){
                perror(err);
            }
        });

    }
    catch(err) {
        perror(err,"Phase is {" + phaseName + "} nodeHint is {" + nodeHint +"}" + J(thisAdaptor.compiledSwarmingDescriptions[this.swarmingName]) ,true );
    }

}