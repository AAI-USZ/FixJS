function (){
            var clientSessionId = findConnectedClientByUserId(this.currentTargetUser);
            console.log("Swarming to user " + this.currentTargetUser + " " + clientSessionId);
            if(clientSessionId){
                this.swarm("notifyChatMessage",clientSessionId);
            }
            /*else {
             this.swarm("mailNotification");
             }*/
        }