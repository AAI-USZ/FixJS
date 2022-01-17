function () {
            if(!this.isClosed){
                logInfo("Closing session " + this.sessionId)
                if(this.redisClient != null){
                    this.redisClient.quit();
                }
                delete thisAdaptor.connectedOutlets[this.sessionId];
                this.socket.destroy();
                this.isClosed = true;
            }
        }