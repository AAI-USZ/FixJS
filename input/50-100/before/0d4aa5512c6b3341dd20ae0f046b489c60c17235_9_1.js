function( msg, mtype ) {
        /* Find the handler for that messagetype in mtable */
        if (mtype in self.mtable) {
          /* and dispatch the message to the handler. */
          self.mtable[mtype](msg);
        }

        if (mtype == "HEARTBEAT") {
          if (msg.index > self.heartbeatIndex) {
            self.heartbeatIndex = msg.index;
            self.commStatusModel.onHeartbeat();
          }
        }
      }