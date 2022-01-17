function (messageObj){
            if(messageObj.swarmingName != thisAdaptor.loginSwarmingName ){
                logErr("Could not execute [" +messageObj.swarmingName +"] swarming without being logged in");
                this.close();
            }
            else{
                this.executeSafe(messageObj);
            }
        }