function (messageObj){
            beginContext(messageObj);
            if(messageObj.command == "start"){
                var ctorName = "start";
                if(messageObj.ctor != undefined){
                    ctorName = messageObj.ctor;
                }

                var swarming = new adaptor.SwarmingPhase(messageObj.swarmingName,ctorName);
                var initVars = thisAdaptor.compiledSwarmingDescriptions[messageObj.swarmingName].vars;
                for (var i in initVars){
                    swarming[i] = initVars[i];
                }
                for (var i in messageObj){
                    swarming[i] = messageObj[i];
                }
                swarming.command = "phase";
                var start = thisAdaptor.compiledSwarmingDescriptions[messageObj.swarmingName][ctorName];
                var args = messageObj.commandArguments;
                delete swarming.commandArguments;
                try{
                    start.apply(swarming,args);
                }
                catch (err){
                    logErr("Execution error ",err);
                }
            }
            else
            if(messageObj.command == "phase"){
                var swarming = new adaptor.SwarmingPhase(messageObj.swarmingName,messageObj);
                swarming.swarm(swarming.currentPhase);
            }
            else{
                logErr("["+thisAdaptor.nodeName +"] I don't know what to execute "+ JSON.stringify(messageObj));
            }
            endContext();
        }