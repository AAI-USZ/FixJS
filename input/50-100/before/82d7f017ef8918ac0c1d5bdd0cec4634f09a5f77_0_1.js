function() {
        if(util.curTime() > this._heartbeatExpirationTime) {
            //If we haven't received a response in 2 * heartbeat rate, send an
            //error
            self.emit("heartbeat-error", "Lost remote after " + (HEARTBEAT * 2) + "ms");
            self.close();
        }
        
        //Heartbeat on the channel
        self.send("_zpc_hb", [0]);
    }