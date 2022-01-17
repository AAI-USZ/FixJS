function() {
        if(util.curTime() > self._heartbeatExpirationTime) {
            //If we haven't received a response in 2 * heartbeat rate, send an
            //error
            self.emit("heartbeat-error", "Lost remote after " + (HEARTBEAT * 2) + "ms");
            self.close();
        }
        
        //Heartbeat on the channel
        try {
            var event = events.create(self._envelope, self._createHeader(), "_zpc_hb", [0]);
            self._socket.send(event);
        } catch(e) {
            console.error("Error occurred while sending heartbeat:", e);
        }
    }