function (){
            var clientSessionId = findConnectedClientByUserId(this.currentTargetUser);
            this.swarm("notifyChatMessage",clientSessionId);
        }