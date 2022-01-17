function(reply)
            {
                for(var i=0;i<reply.length;i++) {
                    this.currentTargetUser = reply[i];
                        this.swarm("directNotification");
                }
            }