function(reply){
                for(var i=0;i<reply.length;i++) {
                    this.currentTargetUser = reply[i];
                    if(this.currentTargetUser != this.userId) {
                        this.swarm("directNotification");
                    }
                }
            }