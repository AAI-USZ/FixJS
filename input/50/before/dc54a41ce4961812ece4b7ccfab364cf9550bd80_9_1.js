function (){
            console.log("Successful login for " + this.userId);
            thisAdaptor.findOutlet(this.sessionId).successfulLogin(this);
            this.swarm("home",this.sessionId);
        }