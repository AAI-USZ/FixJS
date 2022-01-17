function (messageObj){
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