function (){
            logInfo("Failed login for " + this.userId + " in session " + this.sessionId + " and tenant " + this.tenantId );
            findOutlet(this.sessionId).close();
        }