function (){
            console.log("Failed to login:" + this.userId);
            thisAdaptor.findOutlet(this.sessionId).close();
        }