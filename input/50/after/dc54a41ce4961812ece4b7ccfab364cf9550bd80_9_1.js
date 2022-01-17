function (){
            logInfo("Successful login for user " + this.userId + " in session " + this.sessionId + " and tenant " + this.tenantId );
            findOutlet(this.sessionId).successfulLogin(this);
            this.swarm("home",this.sessionId);
        }